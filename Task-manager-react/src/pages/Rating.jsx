import { useState } from "react";
import { useSettings } from "../context/useSettings";

function Rating() {
  const { language } = useSettings();

  // ==========================================
  // TRANSLATIONS
  // ==========================================

  const text = {
    English: {
      feedback: "FEEDBACK",
      rating: "Rating",
      description:
        "Tell us how your TASKFLOW experience is going.",

      yourExperience: "YOUR EXPERIENCE",
      question:
        "How would you rate TASKFLOW?",
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

      rate: "Rate"
    },

    "বাংলা": {
      feedback: "প্রতিক্রিয়া",
      rating: "রেটিং",
      description:
        "আপনার TASKFLOW অভিজ্ঞতা কেমন চলছে তা আমাদের জানান।",

      yourExperience: "আপনার অভিজ্ঞতা",
      question:
        "আপনি TASKFLOW-কে কত রেটিং দেবেন?",
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

      rate: "রেট দিন"
    },

    "हिन्दी": {
      feedback: "प्रतिक्रिया",
      rating: "रेटिंग",
      description:
        "हमें बताएं कि आपका TASKFLOW अनुभव कैसा चल रहा है।",

      yourExperience: "आपका अनुभव",
      question:
        "आप TASKFLOW को कितनी रेटिंग देंगे?",
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

      rate: "रेट करें"
    }
  };

  const currentText =
    text[language] || text.English;

  // ==========================================
  // RATING STATE
  // ==========================================

  const [rating, setRating] = useState(() => {
    const savedRating =
      localStorage.getItem("taskflowRating");

    return savedRating
      ? Number(savedRating)
      : 0;
  });

  const [submitted, setSubmitted] =
    useState(() => {
      const savedRating =
        localStorage.getItem("taskflowRating");

      return Boolean(savedRating);
    });

  // ==========================================
  // SUBMIT RATING
  // ==========================================

  const handleSubmit = () => {
    if (rating === 0) {
      return;
    }

    localStorage.setItem(
      "taskflowRating",
      String(rating)
    );

    setSubmitted(true);
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="modern-page">

      <div className="modern-page-header">

        <div>
          <span className="modern-page-label">
            {currentText.feedback}
          </span>

          <h1>
            {currentText.rating}
          </h1>

          <p>
            {currentText.description}
          </p>
        </div>

      </div>

      <div className="rating-layout">

        <div className="rating-card">

          <div className="rating-icon">
            ⭐
          </div>

          <span className="panel-label">
            {currentText.yourExperience}
          </span>

          <h2>
            {currentText.question}
          </h2>

          <p>
            {currentText.feedbackDescription}
          </p>

          <div className="rating-stars">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                type="button"
                key={star}
                className={
                  star <= rating
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setRating(star)
                }
                disabled={submitted}
                aria-label={`${currentText.rate} ${star} ${currentText.outOfFive}`}
                aria-pressed={
                  star === rating
                }
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

          <button
            type="button"
            className="modern-primary-button rating-submit"
            onClick={handleSubmit}
            disabled={
              rating === 0 || submitted
            }
          >
            {submitted
              ? currentText.thankYou
              : currentText.submitRating}
          </button>

        </div>

        <div className="rating-side">

          <div className="rating-feature">

            <span>✓</span>

            <div>
              <h3>
                {currentText.simple}
              </h3>

              <p>
                {currentText.simpleDescription}
              </p>
            </div>

          </div>

          <div className="rating-feature">

            <span>⚡</span>

            <div>
              <h3>
                {currentText.productive}
              </h3>

              <p>
                {currentText.productiveDescription}
              </p>
            </div>

          </div>

          <div className="rating-feature">

            <span>🔒</span>

            <div>
              <h3>
                {currentText.secure}
              </h3>

              <p>
                {currentText.secureDescription}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Rating;
