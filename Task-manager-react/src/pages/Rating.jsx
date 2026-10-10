
import { useState, useEffect, useCallback } from "react";
import { useSettings } from "../context/useSettings";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

function Rating() {
  const { language } = useSettings();

  // TRANSLATIONS
  const text = {
    English: {
      feedback: "FEEDBACK",
      rating: "Rating",
      description: "Tell us how your TASKFLOW experience is going.",
      yourExperience: "YOUR EXPERIENCE",
      question: "How would you rate TASKFLOW?",
      feedbackDescription:
        "Your feedback helps improve the productivity experience.",
      selectRating: "Select a rating",
      outOfFive: "out of 5 stars",
      submitRating: "Submit Rating",
      thankYou: "Thank You!",
      simple: "Simple",
      simpleDescription:
        "Keep your tasks organized with a clean workspace.",
      productive: "Productive",
      productiveDescription:
        "Focus on what matters and track your progress.",
      secure: "Secure",
      secureDescription:
        "Your account is protected with authentication.",
      rate: "Rate",
      feedbackPlaceholder: "Write your feedback (optional)...",
      loading: "Loading rating...",
      loginAgain: "Please log in again.",
      loadError: "Could not load your ratings.",
      submitError: "Could not submit rating. Please try again.",
    },

    "বাংলা": {
      feedback: "প্রতিক্রিয়া",
      rating: "রেটিং",
      description: "আপনার TASKFLOW অভিজ্ঞতা কেমন চলছে তা আমাদের জানান।",
      yourExperience: "আপনার অভিজ্ঞতা",
      question: "আপনি TASKFLOW-কে কত রেটিং দেবেন?",
      feedbackDescription:
        "আপনার মতামত উৎপাদনশীলতার অভিজ্ঞতা উন্নত করতে সাহায্য করে।",
      selectRating: "একটি রেটিং নির্বাচন করুন",
      outOfFive: "এর মধ্যে ৫টি তারকা",
      submitRating: "রেটিং জমা দিন",
      thankYou: "ধন্যবাদ!",
      simple: "সহজ",
      simpleDescription:
        "একটি পরিষ্কার ওয়ার্কস্পেসের মাধ্যমে আপনার কাজগুলো সংগঠিত রাখুন।",
      productive: "উৎপাদনশীল",
      productiveDescription:
        "গুরুত্বপূর্ণ কাজে মনোযোগ দিন এবং আপনার অগ্রগতি ট্র্যাক করুন।",
      secure: "নিরাপদ",
      secureDescription:
        "আপনার অ্যাকাউন্ট প্রমাণীকরণের মাধ্যমে সুরক্ষিত।",
      rate: "রেট দিন",
      feedbackPlaceholder: "আপনার মতামত লিখুন (ঐচ্ছিক)...",
      loading: "রেটিং লোড হচ্ছে...",
      loginAgain: "অনুগ্রহ করে আবার লগইন করুন।",
      loadError: "রেটিং লোড করা যায়নি।",
      submitError: "রেটিং জমা দেওয়া যায়নি। আবার চেষ্টা করুন।",
    },

    "हिन्दी": {
      feedback: "प्रतिक्रिया",
      rating: "रेटिंग",
      description: "हमें बताएं कि आपका TASKFLOW अनुभव कैसा चल रहा है।",
      yourExperience: "आपका अनुभव",
      question: "आप TASKFLOW को कितनी रेटिंग देंगे?",
      feedbackDescription:
        "आपकी प्रतिक्रिया उत्पादकता अनुभव को बेहतर बनाने में मदद करती है।",
      selectRating: "रेटिंग चुनें",
      outOfFive: "में से 5 स्टार",
      submitRating: "रेटिंग जमा करें",
      thankYou: "धन्यवाद!",
      simple: "सरल",
      simpleDescription:
        "एक साफ़ वर्कस्पेस के साथ अपने कार्यों को व्यवस्थित रखें।",
      productive: "उत्पादक",
      productiveDescription:
        "महत्वपूर्ण कार्यों पर ध्यान दें और अपनी प्रगति को ट्रैक करें।",
      secure: "सुरक्षित",
      secureDescription:
        "आपका खाता प्रमाणीकरण के साथ सुरक्षित है।",
      rate: "रेट करें",
      feedbackPlaceholder: "अपनी प्रतिक्रिया लिखें (वैकल्पिक)...",
      loading: "रेटिंग लोड हो रही है...",
      loginAgain: "कृपया फिर से लॉगिन करें।",
      loadError: "रेटिंग लोड नहीं हो सकी।",
      submitError: "रेटिंग जमा नहीं हो सकी। कृपया फिर कोशिश करें।",
    },
  };

  const currentText = text[language] || text.English;

  // RATING STATE
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // AUTHENTICATED REQUEST WITH AUTOMATIC TOKEN REFRESH
  const fetchWithAuth = useCallback(
    async (url, options = {}) => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        throw new Error(currentText.loginAgain);
      }

      const sendRequest = (accessToken) =>
        fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`,
          },
        });

      let response = await sendRequest(token);

      // If access token expired, refresh it and retry once.
      if (response.status !== 401) {
        return response;
      }

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        throw new Error(currentText.loginAgain);
      }

      let refreshResponse;

      try {
        refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch {
        throw new Error("Could not connect to refresh your session.");
      }

      if (!refreshResponse.ok) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("taskflowUser");
        throw new Error(currentText.loginAgain);
      }

      const refreshData = await refreshResponse.json();

      if (!refreshData.accessToken) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("taskflowUser");
        throw new Error(currentText.loginAgain);
      }

      sessionStorage.setItem("accessToken", refreshData.accessToken);

      // Retry the original request using the new access token.
      response = await sendRequest(refreshData.accessToken);

      if (response.status === 401) {
        throw new Error(currentText.loginAgain);
      }

      return response;
    },
    [currentText.loginAgain]
  );

  // LOAD RATINGS FROM BACKEND
  useEffect(() => {
    let cancelled = false;

    async function loadRatings() {
      setLoading(true);
      setError("");

      try {
        const response = await fetchWithAuth(`${API_URL}/ratings`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(currentText.loadError);
        }

        const ratings = await response.json();

        if (!cancelled && Array.isArray(ratings) && ratings.length > 0) {
          setRating(ratings[0].rating);
          setFeedback(ratings[0].feedback || "");
          setSubmitted(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || currentText.loadError);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRatings();

    return () => {
      cancelled = true;
    };
  }, [language, currentText.loadError, fetchWithAuth]);

  // SUBMIT RATING TO MONGODB
  const handleSubmit = async () => {
    if (rating < 1 || rating > 5 || saving || submitted) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetchWithAuth(`${API_URL}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          feedback,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || currentText.submitError);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || currentText.submitError);
    } finally {
      setSaving(false);
    }
  };

  // PAGE UI
  return (
    <div className="modern-page">
      <div className="modern-page-header">
        <div>
          <span className="modern-page-label">
            {currentText.feedback}
          </span>

          <h1>{currentText.rating}</h1>
          <p>{currentText.description}</p>
        </div>
      </div>

      <div className="rating-layout">
        <div className="rating-card">
          <div className="rating-icon">⭐</div>

          <span className="panel-label">
            {currentText.yourExperience}
          </span>

          <h2>{currentText.question}</h2>
          <p>{currentText.feedbackDescription}</p>

          {loading ? (
            <p>{currentText.loading}</p>
          ) : (
            <>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={star <= rating ? "selected" : ""}
                    onClick={() => setRating(star)}
                    disabled={submitted || saving}
                    aria-label={`${currentText.rate} ${star} ${currentText.outOfFive}`}
                    aria-pressed={star === rating}
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className="rating-label">
                {rating === 0
                  ? currentText.selectRating
                  : `${rating} ${currentText.outOfFive}`}
              </div>

              <textarea
                className="rating-feedback-input"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder={currentText.feedbackPlaceholder}
                maxLength={1000}
                disabled={submitted || saving}
                rows={3}
              />

              {error && (
                <p className="rating-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="button"
                className="modern-primary-button rating-submit"
                onClick={handleSubmit}
                disabled={rating === 0 || submitted || saving}
              >
                {submitted
                  ? currentText.thankYou
                  : saving
                    ? "..."
                    : currentText.submitRating}
              </button>
            </>
          )}
        </div>

        <div className="rating-side">
          <div className="rating-feature">
            <span>✓</span>
            <div>
              <h3>{currentText.simple}</h3>
              <p>{currentText.simpleDescription}</p>
            </div>
          </div>

          <div className="rating-feature">
            <span>⚡</span>
            <div>
              <h3>{currentText.productive}</h3>
              <p>{currentText.productiveDescription}</p>
            </div>
          </div>

          <div className="rating-feature">
            <span>🔒</span>
            <div>
              <h3>{currentText.secure}</h3>
              <p>{currentText.secureDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
