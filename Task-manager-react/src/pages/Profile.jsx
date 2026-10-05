import { useState } from "react";

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
      description: "Manage your TASKFLOW account information.",
      editProfile: "Edit Profile",
      addPhoto: "Add Photo",
      remove: "Remove",
      productivityEnthusiast: "Productivity enthusiast",
      accountStatus: "Account",
      active: "Active",
      security: "Security",
      protected: "Protected",
      notSignedIn: "Not signed in",
      personalInformation: "PERSONAL INFORMATION",
      accountDetails: "Account Details",
      fullName: "Full Name",
      emailAddress: "Email Address",
      accountType: "Account Type",
      standardAccount: "Standard Account",
      enterFullName: "Enter your full name",
      enterEmail: "Enter your email",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      pleaseEnterFullName: "Please enter your full name.",
      pleaseEnterEmail: "Please enter your email address.",
      validEmail: "Please enter a valid email address.",
      imageFile: "Please select an image file.",
      photoSize: "Profile photo must be smaller than 2 MB.",
      unableReadImage: "Unable to read the selected image.",
      profileAlt: "Profile"
    },

    "বাংলা": {
      account: "অ্যাকাউন্ট",
      profile: "প্রোফাইল",
      description: "আপনার TASKFLOW অ্যাকাউন্টের তথ্য পরিচালনা করুন।",
      editProfile: "প্রোফাইল সম্পাদনা করুন",
      addPhoto: "ছবি যোগ করুন",
      remove: "সরান",
      productivityEnthusiast: "উৎপাদনশীলতা উৎসাহী",
      accountStatus: "অ্যাকাউন্ট",
      active: "সক্রিয়",
      security: "নিরাপত্তা",
      protected: "সুরক্ষিত",
      notSignedIn: "সাইন ইন করা নেই",
      personalInformation: "ব্যক্তিগত তথ্য",
      accountDetails: "অ্যাকাউন্টের বিবরণ",
      fullName: "পূর্ণ নাম",
      emailAddress: "ইমেল ঠিকানা",
      accountType: "অ্যাকাউন্টের ধরন",
      standardAccount: "স্ট্যান্ডার্ড অ্যাকাউন্ট",
      enterFullName: "আপনার পূর্ণ নাম লিখুন",
      enterEmail: "আপনার ইমেল লিখুন",
      saveChanges: "পরিবর্তন সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      pleaseEnterFullName: "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।",
      pleaseEnterEmail: "অনুগ্রহ করে আপনার ইমেল ঠিকানা লিখুন।",
      validEmail: "অনুগ্রহ করে একটি বৈধ ইমেল ঠিকানা লিখুন।",
      imageFile: "অনুগ্রহ করে একটি ছবি নির্বাচন করুন।",
      photoSize: "প্রোফাইল ছবির আকার ২ MB-এর কম হতে হবে।",
      unableReadImage: "নির্বাচিত ছবিটি পড়া সম্ভব হয়নি।",
      profileAlt: "প্রোফাইল"
    },

    "हिन्दी": {
      account: "खाता",
      profile: "प्रोफ़ाइल",
      description: "अपने TASKFLOW खाते की जानकारी प्रबंधित करें।",
      editProfile: "प्रोफ़ाइल संपादित करें",
      addPhoto: "फोटो जोड़ें",
      remove: "हटाएँ",
      productivityEnthusiast: "उत्पादकता उत्साही",
      accountStatus: "खाता",
      active: "सक्रिय",
      security: "सुरक्षा",
      protected: "सुरक्षित",
      notSignedIn: "साइन इन नहीं है",
      personalInformation: "व्यक्तिगत जानकारी",
      accountDetails: "खाते का विवरण",
      fullName: "पूरा नाम",
      emailAddress: "ईमेल पता",
      accountType: "खाते का प्रकार",
      standardAccount: "स्टैंडर्ड अकाउंट",
      enterFullName: "अपना पूरा नाम दर्ज करें",
      enterEmail: "अपना ईमेल दर्ज करें",
      saveChanges: "परिवर्तन सहेजें",
      cancel: "रद्द करें",
      pleaseEnterFullName: "कृपया अपना पूरा नाम दर्ज करें।",
      pleaseEnterEmail: "कृपया अपना ईमेल पता दर्ज करें।",
      validEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।",
      imageFile: "कृपया एक छवि फ़ाइल चुनें।",
      photoSize: "प्रोफ़ाइल फोटो 2 MB से छोटी होनी चाहिए।",
      unableReadImage: "चयनित छवि को पढ़ा नहीं जा सका।",
      profileAlt: "प्रोफ़ाइल"
    }
  };

  const currentText =
    text[language] || text.English;

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
        sessionStorage.getItem("taskflowUser");

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
    useState(
      () =>
        sessionStorage.getItem(
          "taskflowProfilePhoto"
        ) || ""
    );

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

  const handleSaveProfile = (event) => {
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

    if (!emailPattern.test(trimmedEmail)) {
      alert(
        currentText.validEmail
      );
      return;
    }

    const updatedUser = {
      name: trimmedName,
      email: trimmedEmail
    };

    // Update React state
    setUser(updatedUser);

    // Save updated user information
    sessionStorage.setItem(
      "taskflowUser",
      JSON.stringify(updatedUser)
    );

    // Update edit fields
    setEditName(trimmedName);
    setEditEmail(trimmedEmail);

    // Exit edit mode
    setIsEditing(false);
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
    if (!file.type.startsWith("image/")) {
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

    reader.onload = () => {
      const imageData =
        reader.result;

      setProfilePhoto(imageData);

      // Save profile photo per browser tab
      sessionStorage.setItem(
        "taskflowProfilePhoto",
        imageData
      );

      // Allow selecting the same file again later
      event.target.value = "";
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

  const handleRemovePhoto = () => {
    setProfilePhoto("");

    sessionStorage.removeItem(
      "taskflowProfilePhoto"
    );
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
            onClick={handleEditProfile}
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
                alt={currentText.profileAlt}
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
                  📷 {currentText.addPhoto}
                </label>

                <input
                  id="profile-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />

                {profilePhoto && (
                  <button
                    type="button"
                    className="profile-remove-photo"
                    onClick={handleRemovePhoto}
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
            {currentText.productivityEnthusiast}
          </p>

          <div className="profile-divider" />

          {/* ACCOUNT STATUS */}

          <div className="profile-item">
            <span>
              {currentText.accountStatus}
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
                {currentText.personalInformation}
              </span>

              <h2>
                {currentText.accountDetails}
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
                  {currentText.emailAddress}
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
                  {currentText.accountType}
                </label>

                <input
                  type="text"
                  value={currentText.standardAccount}
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
              onSubmit={handleSaveProfile}
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
                  {currentText.emailAddress}
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
                  {currentText.accountType}
                </label>

                <input
                  type="text"
                  value={currentText.standardAccount}
                  readOnly
                />
              </div>

              {/* SAVE / CANCEL */}

              <div className="profile-actions">

                <button
                  type="submit"
                  className="profile-save-button"
                >
                  💾 {currentText.saveChanges}
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  {currentText.cancel}
                </button>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;

