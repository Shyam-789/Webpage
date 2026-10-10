import { useState, useEffect } from "react";

import { useSettings } from "../context/useSettings";

function Profile() {
  const { language } = useSettings();

  // ==========================================
  // TRANSLATIONS
  // ==========================================

  const text = {
    English: {
      account: "ACCOUNT",
      profile: "Profile",
      description:
        "Manage your TASKFLOW account information.",
      editProfile: "Edit Profile",
      addPhoto: "Add Photo",
      remove: "Remove",
      productivityEnthusiast:
        "Productivity enthusiast",
      accountStatus: "Account",
      active: "Active",
      security: "Security",
      protected: "Protected",
      notSignedIn: "Not signed in",

      personalInformation:
        "PERSONAL INFORMATION",
      accountDetails: "Account Details",

      fullName: "Full Name",
      emailAddress: "Email Address",
      accountType: "Account Type",
      standardAccount: "Standard Account",

      enterFullName:
        "Enter your full name",
      enterEmail:
        "Enter your email",

      saveChanges: "Save Changes",
      cancel: "Cancel",

      pleaseEnterFullName:
        "Please enter your full name.",
      pleaseEnterEmail:
        "Please enter your email address.",
      validEmail:
        "Please enter a valid email address.",

      imageFile:
        "Please select an image file.",
      photoSize:
        "Profile photo must be smaller than 2 MB.",
      unableReadImage:
        "Unable to read the selected image.",
      profileAlt: "Profile",

      profileUpdated:
        "Profile updated successfully.",
      profileUpdateFailed:
        "Unable to update profile.",

      photoUpdated:
        "Profile photo updated successfully.",
      photoUpdateFailed:
        "Unable to update profile photo.",

      photoRemoved:
        "Profile photo removed successfully.",
      photoRemoveFailed:
        "Unable to remove profile photo.",

      // CHANGE PASSWORD
      passwordSecurity:
        "PASSWORD & SECURITY",
      changePassword:
        "Change Password",
      currentPassword:
        "Current Password",
      newPassword:
        "New Password",
      confirmPassword:
        "Confirm New Password",
      enterCurrentPassword:
        "Enter your current password",
      enterNewPassword:
        "Enter your new password",
      confirmNewPassword:
        "Confirm your new password",
      changePasswordButton:
        "Change Password",
      passwordChanged:
        "Password changed successfully.",
      passwordMismatch:
        "New passwords do not match.",
      currentPasswordRequired:
        "Please enter your current password.",
      newPasswordRequired:
        "Please enter a new password.",
      passwordMinLength:
        "New password must be at least 6 characters.",
      passwordChangeFailed:
        "Unable to change password."
    },

    "বাংলা": {
      account: "অ্যাকাউন্ট",
      profile: "প্রোফাইল",
      description:
        "আপনার TASKFLOW অ্যাকাউন্টের তথ্য পরিচালনা করুন।",
      editProfile: "প্রোফাইল সম্পাদনা করুন",
      addPhoto: "ছবি যোগ করুন",
      remove: "সরান",
      productivityEnthusiast:
        "উৎপাদনশীলতা উৎসাহী",
      accountStatus: "অ্যাকাউন্ট",
      active: "সক্রিয়",
      security: "নিরাপত্তা",
      protected: "সুরক্ষিত",
      notSignedIn: "সাইন ইন করা নেই",

      personalInformation:
        "ব্যক্তিগত তথ্য",
      accountDetails:
        "অ্যাকাউন্টের বিবরণ",

      fullName: "পূর্ণ নাম",
      emailAddress: "ইমেল ঠিকানা",
      accountType: "অ্যাকাউন্টের ধরন",
      standardAccount:
        "স্ট্যান্ডার্ড অ্যাকাউন্ট",

      enterFullName:
        "আপনার পূর্ণ নাম লিখুন",
      enterEmail:
        "আপনার ইমেল লিখুন",

      saveChanges:
        "পরিবর্তন সংরক্ষণ করুন",
      cancel: "বাতিল করুন",

      pleaseEnterFullName:
        "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।",
      pleaseEnterEmail:
        "অনুগ্রহ করে আপনার ইমেল ঠিকানা লিখুন।",
      validEmail:
        "অনুগ্রহ করে একটি বৈধ ইমেল ঠিকানা লিখুন।",

      imageFile:
        "অনুগ্রহ করে একটি ছবি নির্বাচন করুন।",
      photoSize:
        "প্রোফাইল ছবির আকার ২ MB-এর কম হতে হবে।",
      unableReadImage:
        "নির্বাচিত ছবিটি পড়া সম্ভব হয়নি।",
      profileAlt: "প্রোফাইল",

      profileUpdated:
        "প্রোফাইল সফলভাবে আপডেট হয়েছে।",
      profileUpdateFailed:
        "প্রোফাইল আপডেট করা যায়নি।",

      photoUpdated:
        "প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে।",
      photoUpdateFailed:
        "প্রোফাইল ছবি আপডেট করা যায়নি।",

      photoRemoved:
        "প্রোফাইল ছবি সফলভাবে সরানো হয়েছে।",
      photoRemoveFailed:
        "প্রোফাইল ছবি সরানো যায়নি।",

      // CHANGE PASSWORD
      passwordSecurity:
        "পাসওয়ার্ড ও নিরাপত্তা",
      changePassword:
        "পাসওয়ার্ড পরিবর্তন করুন",
      currentPassword:
        "বর্তমান পাসওয়ার্ড",
      newPassword:
        "নতুন পাসওয়ার্ড",
      confirmPassword:
        "নতুন পাসওয়ার্ড নিশ্চিত করুন",
      enterCurrentPassword:
        "আপনার বর্তমান পাসওয়ার্ড লিখুন",
      enterNewPassword:
        "আপনার নতুন পাসওয়ার্ড লিখুন",
      confirmNewPassword:
        "আপনার নতুন পাসওয়ার্ড নিশ্চিত করুন",
      changePasswordButton:
        "পাসওয়ার্ড পরিবর্তন করুন",
      passwordChanged:
        "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।",
      passwordMismatch:
        "নতুন পাসওয়ার্ড দুটি একই নয়।",
      currentPasswordRequired:
        "অনুগ্রহ করে বর্তমান পাসওয়ার্ড লিখুন।",
      newPasswordRequired:
        "অনুগ্রহ করে নতুন পাসওয়ার্ড লিখুন।",
      passwordMinLength:
        "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
      passwordChangeFailed:
        "পাসওয়ার্ড পরিবর্তন করা যায়নি।"
    },

    "हिन्दी": {
      account: "खाता",
      profile: "प्रोफ़ाइल",
      description:
        "अपने TASKFLOW खाते की जानकारी प्रबंधित करें।",
      editProfile:
        "प्रोफ़ाइल संपादित करें",
      addPhoto: "फोटो जोड़ें",
      remove: "हटाएँ",
      productivityEnthusiast:
        "उत्पादकता उत्साही",
      accountStatus: "खाता",
      active: "सक्रिय",
      security: "सुरक्षा",
      protected: "सुरक्षित",
      notSignedIn:
        "साइन इन नहीं है",

      personalInformation:
        "व्यक्तिगत जानकारी",
      accountDetails:
        "खाते का विवरण",

      fullName: "पूरा नाम",
      emailAddress: "ईमेल पता",
      accountType: "खाते का प्रकार",
      standardAccount:
        "स्टैंडर्ड अकाउंट",

      enterFullName:
        "अपना पूरा नाम दर्ज करें",
      enterEmail:
        "अपना ईमेल दर्ज करें",

      saveChanges:
        "परिवर्तन सहेजें",
      cancel: "रद्द करें",

      pleaseEnterFullName:
        "कृपया अपना पूरा नाम दर्ज करें।",
      pleaseEnterEmail:
        "कृपया अपना ईमेल पता दर्ज करें।",
      validEmail:
        "कृपया एक मान्य ईमेल पता दर्ज करें।",

      imageFile:
        "कृपया एक छवि फ़ाइल चुनें।",
      photoSize:
        "प्रोफ़ाइल फोटो 2 MB से छोटी होनी चाहिए।",
      unableReadImage:
        "चयनित छवि को पढ़ा नहीं जा सका।",
      profileAlt: "प्रोफ़ाइल",

      profileUpdated:
        "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई।",
      profileUpdateFailed:
        "प्रोफ़ाइल अपडेट नहीं हो सकी।",

      photoUpdated:
        "प्रोफ़ाइल फोटो सफलतापूर्वक अपडेट हो गई।",
      photoUpdateFailed:
        "प्रोफ़ाइल फोटो अपडेट नहीं हो सकी।",

      photoRemoved:
        "प्रोफ़ाइल फोटो सफलतापूर्वक हटा दी गई।",
      photoRemoveFailed:
        "प्रोफ़ाइल फोटो हटाई नहीं जा सकी।",

      // CHANGE PASSWORD
      passwordSecurity:
        "पासवर्ड और सुरक्षा",
      changePassword:
        "पासवर्ड बदलें",
      currentPassword:
        "वर्तमान पासवर्ड",
      newPassword:
        "नया पासवर्ड",
      confirmPassword:
        "नया पासवर्ड पुष्टि करें",
      enterCurrentPassword:
        "अपना वर्तमान पासवर्ड दर्ज करें",
      enterNewPassword:
        "अपना नया पासवर्ड दर्ज करें",
      confirmNewPassword:
        "अपना नया पासवर्ड पुष्टि करें",
      changePasswordButton:
        "पासवर्ड बदलें",
      passwordChanged:
        "पासवर्ड सफलतापूर्वक बदल दिया गया।",
      passwordMismatch:
        "नए पासवर्ड समान नहीं हैं।",
      currentPasswordRequired:
        "कृपया वर्तमान पासवर्ड दर्ज करें।",
      newPasswordRequired:
        "कृपया नया पासवर्ड दर्ज करें।",
      passwordMinLength:
        "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
      passwordChangeFailed:
        "पासवर्ड बदलने में असमर्थ।"
    }
  };

  const currentText =
    text[language] || text.English;

  // ==========================================
  // API URL
  // ==========================================

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

  // ==========================================
  // AUTHENTICATION
  // ==========================================

  const accessToken =
    sessionStorage.getItem("accessToken");

  const refreshToken =
    sessionStorage.getItem("refreshToken");

  const isSignedIn =
    !!accessToken || !!refreshToken;

  // ==========================================
  // USER INFORMATION
  // ==========================================

  const getSavedUser = () => {
    try {
      const savedUser =
        sessionStorage.getItem(
          "taskflowUser"
        );

      if (savedUser) {
        const parsedUser =
          JSON.parse(savedUser);

        return {
          name:
            parsedUser.name ||
            "TaskFlow User",

          email:
            parsedUser.email ||
            "Your registered email"
        };
      }
    } catch (error) {
      console.error(
        "Error reading user data:",
        error
      );
    }

    return {
      name: "TaskFlow User",
      email: "Your registered email"
    };
  };

  const [user, setUser] =
    useState(getSavedUser);

  // ==========================================
  // EDIT MODE
  // ==========================================

  const [isEditing, setIsEditing] =
    useState(false);

  const [editName, setEditName] =
    useState(user.name);

  const [editEmail, setEditEmail] =
    useState(user.email);

  // ==========================================
  // PROFILE PHOTO
  // ==========================================

  const [profilePhoto, setProfilePhoto] =
    useState("");

  // ==========================================
  // LOAD PROFILE FROM MONGODB
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      if (!accessToken) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/auth/profile`,
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${accessToken}`
              }
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          console.error(
            "LOAD PROFILE ERROR:",
            data.message
          );

          return;
        }

        if (data.user) {
          const savedUser = {
            name:
              data.user.name ||
              "TaskFlow User",

            email:
              data.user.email ||
              "Your registered email"
          };

          setUser(savedUser);

          setEditName(
            savedUser.name
          );

          setEditEmail(
            savedUser.email
          );

          // Load photo from MongoDB
          setProfilePhoto(
            data.user.profilePhoto || ""
          );

          // Keep user information in session
          sessionStorage.setItem(
            "taskflowUser",
            JSON.stringify(savedUser)
          );
        }

      } catch (error) {
        console.error(
          "LOAD PROFILE ERROR:",
          error
        );
      }
    };

    loadProfile();
  }, [accessToken, API_URL]);

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const [
    currentPassword,
    setCurrentPassword
  ] = useState("");

  const [
    newPassword,
    setNewPassword
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [
    passwordMessage,
    setPasswordMessage
  ] = useState("");

  const [
    passwordError,
    setPasswordError
  ] = useState("");

  const [
    isChangingPassword,
    setIsChangingPassword
  ] = useState(false);

  // ==========================================
  // EDIT PROFILE
  // ==========================================

  const handleEditProfile = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(true);
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(false);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    const trimmedName =
      editName.trim();

    const trimmedEmail =
      editEmail.trim().toLowerCase();

    // Check name
    if (!trimmedName) {
      alert(
        currentText.pleaseEnterFullName
      );
      return;
    }

    // Check email
    if (!trimmedEmail) {
      alert(
        currentText.pleaseEnterEmail
      );
      return;
    }

    // Check email format
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        trimmedEmail
      )
    ) {
      alert(
        currentText.validEmail
      );
      return;
    }

    if (!accessToken) {
      alert(
        currentText.profileUpdateFailed
      );
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/auth/profile`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${accessToken}`
            },

            body: JSON.stringify({
              name: trimmedName,
              email: trimmedEmail
            })
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            currentText.profileUpdateFailed
        );

        return;
      }

      const updatedUser = {
        name:
          data.user?.name ||
          trimmedName,

        email:
          data.user?.email ||
          trimmedEmail
      };

      // Update React state
      setUser(updatedUser);

      // Save user information
      sessionStorage.setItem(
        "taskflowUser",
        JSON.stringify(updatedUser)
      );

      setEditName(
        updatedUser.name
      );

      setEditEmail(
        updatedUser.email
      );

      setIsEditing(false);

      alert(
        currentText.profileUpdated
      );

    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      alert(
        currentText.profileUpdateFailed
      );
    }
  };

  // ==========================================
  // PROFILE PHOTO UPLOAD
  // ==========================================

  const handlePhotoChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // Check image type
    if (
      !file.type.startsWith("image/")
    ) {
      alert(
        currentText.imageFile
      );

      event.target.value = "";

      return;
    }

    // Maximum 2 MB
    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        currentText.photoSize
      );

      event.target.value = "";

      return;
    }

    const reader =
      new FileReader();

    reader.onload = async () => {
      const imageData =
        reader.result;

      if (!accessToken) {
        alert(
          currentText.photoUpdateFailed
        );

        event.target.value = "";

        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/auth/profile/photo`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${accessToken}`
              },

              body: JSON.stringify({
                profilePhoto:
                  imageData
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              currentText.photoUpdateFailed
          );

          event.target.value = "";

          return;
        }

        // Update React state
        setProfilePhoto(
          data.profilePhoto ||
            imageData
        );

        alert(
          currentText.photoUpdated
        );

      } catch (error) {
        console.error(
          "UPDATE PROFILE PHOTO ERROR:",
          error
        );

        alert(
          currentText.photoUpdateFailed
        );

      } finally {
        // Allow selecting same file again
        event.target.value = "";
      }
    };

    reader.onerror = () => {
      alert(
        currentText.unableReadImage
      );

      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  // ==========================================
  // REMOVE PROFILE PHOTO
  // ==========================================

  const handleRemovePhoto = async () => {
    if (!accessToken) {
      alert(
        currentText.photoRemoveFailed
      );

      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/auth/profile/photo`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${accessToken}`
            }
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            currentText.photoRemoveFailed
        );

        return;
      }

      setProfilePhoto("");

      alert(
        currentText.photoRemoved
      );

    } catch (error) {
      console.error(
        "REMOVE PROFILE PHOTO ERROR:",
        error
      );

      alert(
        currentText.photoRemoveFailed
      );
    }
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handleChangePassword = async (
    event
  ) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError(
        currentText.currentPasswordRequired
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        currentText.newPasswordRequired
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        currentText.passwordMinLength
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setPasswordError(
        currentText.passwordMismatch
      );
      return;
    }

    if (!accessToken) {
      setPasswordError(
        currentText.passwordChangeFailed
      );
      return;
    }

    try {
      setIsChangingPassword(true);

      const response =
        await fetch(
          `${API_URL}/auth/change-password`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${accessToken}`
            },

            body: JSON.stringify({
              currentPassword,
              newPassword
            })
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setPasswordError(
          data.message ||
            currentText.passwordChangeFailed
        );

        return;
      }

      setPasswordMessage(
        currentText.passwordChanged
      );

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error(
        "CHANGE PASSWORD ERROR:",
        error
      );

      setPasswordError(
        currentText.passwordChangeFailed
      );

    } finally {
      setIsChangingPassword(false);
    }
  };

  // ==========================================
  // AVATAR LETTER
  // ==========================================

  const avatarLetter =
    user.name &&
    user.name.trim()
      ? user.name
          .trim()
          .charAt(0)
          .toUpperCase()
      : "U";

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="modern-page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="modern-page-header">

        <div>

          <span className="modern-page-label">
            {currentText.account}
          </span>

          <h1>
            {currentText.profile}
          </h1>

          <p>
            {currentText.description}
          </p>

        </div>

        {!isEditing && (
          <button
            type="button"
            className="modern-primary-button"
            onClick={
              handleEditProfile
            }
          >
            {currentText.editProfile}
          </button>
        )}

      </div>

      {/* =====================================
          PROFILE LAYOUT
      ====================================== */}

      <div className="profile-layout">

        {/* ===================================
            PROFILE CARD
        =================================== */}

        <div className="profile-card">

          {/* PROFILE PHOTO */}

          <div className="profile-avatar-wrapper">

            {profilePhoto ? (

              <img
                src={profilePhoto}
                alt={
                  currentText.profileAlt
                }
                className="profile-avatar profile-avatar-image"
              />

            ) : (

              <div className="profile-avatar">
                {avatarLetter}
              </div>

            )}

            {/* PHOTO CONTROLS */}

            {isEditing && (

              <div className="profile-photo-actions">

                <label
                  htmlFor="profile-photo-input"
                  className="profile-photo-button"
                >
                  📷{" "}
                  {currentText.addPhoto}
                </label>

                <input
                  id="profile-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={
                    handlePhotoChange
                  }
                  hidden
                />

                {profilePhoto && (

                  <button
                    type="button"
                    className="profile-remove-photo"
                    onClick={
                      handleRemovePhoto
                    }
                  >
                    {currentText.remove}
                  </button>

                )}

              </div>

            )}

          </div>

          {/* USER NAME */}

          <h2>
            {user.name}
          </h2>

          <p>
            {
              currentText.productivityEnthusiast
            }
          </p>

          <div className="profile-divider" />

          {/* ACCOUNT STATUS */}

          <div className="profile-item">

            <span>
              {
                currentText.accountStatus
              }
            </span>

            <strong>
              {currentText.active}
            </strong>

          </div>

          {/* SECURITY STATUS */}

          <div className="profile-item">

            <span>
              {currentText.security}
            </span>

            <strong>
              {isSignedIn
                ? currentText.protected
                : currentText.notSignedIn}
            </strong>

          </div>

        </div>

        {/* ===================================
            INFORMATION PANEL
        =================================== */}

        <div className="modern-panel">

          <div className="modern-panel-header">

            <div>

              <span className="panel-label">
                {
                  currentText.personalInformation
                }
              </span>

              <h2>
                {
                  currentText.accountDetails
                }
              </h2>

            </div>

          </div>

          {/* =================================
              VIEW MODE
          ================================= */}

          {!isEditing && (

            <div className="profile-form">

              {/* FULL NAME */}

              <div className="profile-field">

                <label>
                  {currentText.fullName}
                </label>

                <input
                  type="text"
                  value={user.name}
                  readOnly
                />

              </div>

              {/* EMAIL */}

              <div className="profile-field">

                <label>
                  {
                    currentText.emailAddress
                  }
                </label>

                <input
                  type="email"
                  value={user.email}
                  readOnly
                />

              </div>

              {/* ACCOUNT TYPE */}

              <div className="profile-field">

                <label>
                  {
                    currentText.accountType
                  }
                </label>

                <input
                  type="text"
                  value={
                    currentText.standardAccount
                  }
                  readOnly
                />

              </div>

            </div>

          )}

          {/* =================================
              EDIT MODE
          ================================= */}

          {isEditing && (

            <form
              className="profile-form"
              onSubmit={
                handleSaveProfile
              }
            >

              {/* FULL NAME */}

              <div className="profile-field">

                <label htmlFor="profile-name">
                  {currentText.fullName}
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(
                      event.target.value
                    )
                  }
                  placeholder={
                    currentText.enterFullName
                  }
                  autoFocus
                />

              </div>

              {/* EMAIL */}

              <div className="profile-field">

                <label htmlFor="profile-email">
                  {
                    currentText.emailAddress
                  }
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={editEmail}
                  onChange={(event) =>
                    setEditEmail(
                      event.target.value
                    )
                  }
                  placeholder={
                    currentText.enterEmail
                  }
                />

              </div>

              {/* ACCOUNT TYPE */}

              <div className="profile-field">

                <label>
                  {
                    currentText.accountType
                  }
                </label>

                <input
                  type="text"
                  value={
                    currentText.standardAccount
                  }
                  readOnly
                />

              </div>

              {/* SAVE / CANCEL */}

              <div className="profile-actions">

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  💾{" "}
                  {
                    currentText.saveChanges
                  }
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={
                    handleCancel
                  }
                >
                  {currentText.cancel}
                </button>

              </div>

            </form>

          )}

        </div>

      </div>

      {/* =====================================
          CHANGE PASSWORD
      ====================================== */}

      <div
        className="modern-panel"
        style={{
          marginTop: "24px"
        }}
      >

        <div className="modern-panel-header">

          <div>

            <span className="panel-label">
              {
                currentText.passwordSecurity
              }
            </span>

            <h2>
              {
                currentText.changePassword
              }
            </h2>

          </div>

        </div>

        <form
          className="profile-form"
          onSubmit={
            handleChangePassword
          }
        >

          {/* CURRENT PASSWORD */}

          <div className="profile-field">

            <label htmlFor="current-password">
              {
                currentText.currentPassword
              }
            </label>

            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              placeholder={
                currentText.enterCurrentPassword
              }
            />

          </div>

          {/* NEW PASSWORD */}

          <div className="profile-field">

            <label htmlFor="new-password">
              {
                currentText.newPassword
              }
            </label>

            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              placeholder={
                currentText.enterNewPassword
              }
            />

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="profile-field">

            <label htmlFor="confirm-password">
              {
                currentText.confirmPassword
              }
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder={
                currentText.confirmNewPassword
              }
            />

          </div>

          {/* ERROR */}

          {passwordError && (

            <p
              style={{
                color: "#dc2626",
                margin: "8px 0"
              }}
            >
              {passwordError}
            </p>

          )}

          {/* SUCCESS */}

          {passwordMessage && (

            <p
              style={{
                color: "#16a34a",
                margin: "8px 0"
              }}
            >
              {passwordMessage}
            </p>

          )}

          {/* BUTTON */}

          <div className="profile-actions">

            <button
              type="submit"
              className="profile-save-button"
              disabled={
                isChangingPassword
              }
            >
              🔐{" "}
              {isChangingPassword
                ? "..."
                : currentText.changePasswordButton}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Profile;