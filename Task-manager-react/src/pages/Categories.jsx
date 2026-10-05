import {
  useEffect,
  useMemo,
  useState
} from "react";

import { useSettings } from "../context/useSettings";

function Categories({ tasks = [] }) {
  const { language } = useSettings();

  const text = {
    English: {
      pageLabel: "ORGANIZATION",
      title: "Categories",
      description:
        "Organize your work and keep everything easy to find.",
      newCategory: "New Category",

      createNewCategory: "Create New Category",
      categoryNameDescription:
        "Give your new category a name.",
      closeCategoryForm: "Close category form",
      categoryPlaceholder:
        "Enter category name...",
      createCategory: "Create Category",
      cancel: "Cancel",

      allTasks: "All Tasks",
      allTasksDescription: "All your tasks",

      pending: "Pending",
      pendingDescription: "Tasks in progress",

      completed: "Completed",
      completedDescription: "Finished tasks",

      important: "Important",
      importantDescription: "Important tasks",

      customCategory: "Custom category",

      task: "task",
      tasks: "tasks",

      categoryExists:
        "This category already exists.",

      deleteCategory: (name) =>
        `Delete "${name}" category?`,

      selectedCategory: "SELECTED CATEGORY",

      noTasksHere: "No tasks here",
      noTasksInCategory:
        "There are no tasks in this category yet.",

      keepOrganized:
        "Keep your workspace organized",

      categoryInfo:
        "Categories help you separate different types of work and find tasks faster.",

      delete: "Delete"
    },

    "বাংলা": {
      pageLabel: "সংগঠন",
      title: "ক্যাটাগরি",
      description:
        "আপনার কাজ সংগঠিত রাখুন এবং সবকিছু সহজে খুঁজে নিন।",
      newCategory: "নতুন ক্যাটাগরি",

      createNewCategory: "নতুন ক্যাটাগরি তৈরি করুন",
      categoryNameDescription:
        "আপনার নতুন ক্যাটাগরির একটি নাম দিন।",
      closeCategoryForm: "ক্যাটাগরি ফর্ম বন্ধ করুন",
      categoryPlaceholder:
        "ক্যাটাগরির নাম লিখুন...",
      createCategory: "ক্যাটাগরি তৈরি করুন",
      cancel: "বাতিল করুন",

      allTasks: "সব কাজ",
      allTasksDescription: "আপনার সব কাজ",

      pending: "অসম্পন্ন",
      pendingDescription: "চলমান কাজ",

      completed: "সম্পন্ন",
      completedDescription: "সম্পন্ন করা কাজ",

      important: "গুরুত্বপূর্ণ",
      importantDescription: "গুরুত্বপূর্ণ কাজ",

      customCategory: "কাস্টম ক্যাটাগরি",

      task: "কাজ",
      tasks: "টি কাজ",

      categoryExists:
        "এই ক্যাটাগরিটি ইতিমধ্যে রয়েছে।",

      deleteCategory: (name) =>
        `"${name}" ক্যাটাগরিটি মুছে ফেলবেন?`,

      selectedCategory: "নির্বাচিত ক্যাটাগরি",

      noTasksHere: "এখানে কোনো কাজ নেই",
      noTasksInCategory:
        "এই ক্যাটাগরিতে এখনও কোনো কাজ নেই।",

      keepOrganized:
        "আপনার ওয়ার্কস্পেস সংগঠিত রাখুন",

      categoryInfo:
        "ক্যাটাগরি আপনাকে বিভিন্ন ধরনের কাজ আলাদা করতে এবং দ্রুত কাজ খুঁজে পেতে সাহায্য করে।",

      delete: "মুছুন"
    },

    "हिन्दी": {
      pageLabel: "संगठन",
      title: "श्रेणियाँ",
      description:
        "अपने काम को व्यवस्थित रखें और सब कुछ आसानी से खोजें।",
      newCategory: "नई श्रेणी",

      createNewCategory: "नई श्रेणी बनाएँ",
      categoryNameDescription:
        "अपनी नई श्रेणी का नाम दें।",
      closeCategoryForm: "श्रेणी फ़ॉर्म बंद करें",
      categoryPlaceholder:
        "श्रेणी का नाम दर्ज करें...",
      createCategory: "श्रेणी बनाएँ",
      cancel: "रद्द करें",

      allTasks: "सभी कार्य",
      allTasksDescription: "आपके सभी कार्य",

      pending: "लंबित",
      pendingDescription: "प्रगति में कार्य",

      completed: "पूर्ण",
      completedDescription: "पूर्ण किए गए कार्य",

      important: "महत्वपूर्ण",
      importantDescription: "महत्वपूर्ण कार्य",

      customCategory: "कस्टम श्रेणी",

      task: "कार्य",
      tasks: "कार्य",

      categoryExists:
        "यह श्रेणी पहले से मौजूद है।",

      deleteCategory: (name) =>
        `"${name}" श्रेणी हटाएँ?`,

      selectedCategory: "चयनित श्रेणी",

      noTasksHere: "यहाँ कोई कार्य नहीं है",
      noTasksInCategory:
        "इस श्रेणी में अभी कोई कार्य नहीं है।",

      keepOrganized:
        "अपने वर्कस्पेस को व्यवस्थित रखें",

      categoryInfo:
        "श्रेणियाँ आपको अलग-अलग प्रकार के काम को अलग रखने और कार्यों को जल्दी खोजने में मदद करती हैं।",

      delete: "हटाएँ"
    }
  };

  const currentText =
    text[language] || text.English;

  // =========================================
  // CATEGORY STATE
  // =========================================

  const [customCategories, setCustomCategories] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "taskflowCustomCategories"
          ) || "[]"
        );
      } catch (error) {
        console.error(
          "Error loading custom categories:",
          error
        );

        return [];
      }
    });

  const [showCategoryForm, setShowCategoryForm] =
    useState(false);

  const [categoryName, setCategoryName] =
    useState("");

  // =========================================
  // SELECTED CATEGORY
  // =========================================

  const [selectedCategory, setSelectedCategory] =
    useState(() => {
      return (
        localStorage.getItem(
          "taskflowSelectedCategory"
        ) || "All Tasks"
      );
    });

  // =========================================
  // SAVE SELECTED CATEGORY
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "taskflowSelectedCategory",
      selectedCategory
    );
  }, [selectedCategory]);

  // =========================================
  // SAVE CUSTOM CATEGORIES
  // =========================================

  useEffect(() => {
    localStorage.setItem(
      "taskflowCustomCategories",
      JSON.stringify(customCategories)
    );
  }, [customCategories]);

  // =========================================
  // IMPORTANT TASKS
  // =========================================

  const importantTaskIds = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "taskflowImportantTasks"
        ) || "[]"
      );
    } catch (error) {
      console.error(
        "Error reading important tasks:",
        error
      );

      return [];
    }
  }, []);

  const importantTasks = useMemo(() => {
    return tasks.filter((task) =>
      importantTaskIds.includes(task._id)
    );
  }, [tasks, importantTaskIds]);

  // =========================================
  // TASK COUNTS
  // =========================================

  const taskCategories = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const pending = tasks.filter(
      (task) => !task.completed
    ).length;

    return [
      {
        name: "All Tasks",
        icon: "◈",
        count: tasks.length,
        description: "All your tasks",
        type: "all",
      },
      {
        name: "Pending",
        icon: "○",
        count: pending,
        description: "Tasks in progress",
        type: "pending",
      },
      {
        name: "Completed",
        icon: "✓",
        count: completed,
        description: "Finished tasks",
        type: "completed",
      },
      {
        name: "Important",
        icon: "★",
        count: importantTasks.length,
        description: "Important tasks",
        type: "important",
      },
    ];
  }, [tasks, importantTasks]);

  // =========================================
  // ALL CATEGORIES
  // =========================================

  const categories = [
    ...taskCategories,
    ...customCategories,
  ];

  // =========================================
  // CREATE CATEGORY
  // =========================================

  const handleCreateCategory = (event) => {
    event.preventDefault();

    const trimmedName = categoryName.trim();

    if (trimmedName === "") {
      return;
    }

    // Prevent duplicate category names
    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert(currentText.categoryExists);
      return;
    }

    const newCategory = {
      name: trimmedName,
      icon: "▣",
      count: 0,
      description: currentText.customCategory,
      type: "custom",
    };

    setCustomCategories((current) => [
      ...current,
      newCategory,
    ]);

    setSelectedCategory(trimmedName);
    setCategoryName("");
    setShowCategoryForm(false);
  };

  // =========================================
  // DELETE CUSTOM CATEGORY
  // =========================================

  const handleDeleteCategory = (categoryName) => {
    const confirmed = window.confirm(
      currentText.deleteCategory(categoryName)
    );

    if (!confirmed) {
      return;
    }

    setCustomCategories((current) =>
      current.filter(
        (category) =>
          category.name !== categoryName
      )
    );

    if (selectedCategory === categoryName) {
      setSelectedCategory("All Tasks");
    }
  };

  // =========================================
  // CLOSE FORM
  // =========================================

  const handleCancelCategory = () => {
    setCategoryName("");
    setShowCategoryForm(false);
  };

  // =========================================
  // SELECT CATEGORY
  // =========================================

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // =========================================
  // SELECTED CATEGORY
  // =========================================

  const selectedCategoryData = categories.find(
    (category) =>
      category.name === selectedCategory
  );

  // =========================================
  // FILTER TASKS
  // =========================================

  const filteredTasks = (() => {
    if (!selectedCategoryData) {
      return tasks;
    }

    if (selectedCategoryData.type === "all") {
      return tasks;
    }

    if (selectedCategoryData.type === "pending") {
      return tasks.filter(
        (task) => !task.completed
      );
    }

    if (selectedCategoryData.type === "completed") {
      return tasks.filter(
        (task) => task.completed
      );
    }

    if (selectedCategoryData.type === "important") {
      return importantTasks;
    }

    // Custom categories
    return [];
  })();

  // =========================================
  // DISPLAY CATEGORY NAME
  // =========================================

  const getCategoryDisplayName = (category) => {
    if (!category) {
      return currentText.allTasks;
    }

    if (category.type === "all") {
      return currentText.allTasks;
    }

    if (category.type === "pending") {
      return currentText.pending;
    }

    if (category.type === "completed") {
      return currentText.completed;
    }

    if (category.type === "important") {
      return currentText.important;
    }

    return category.name;
  };

  // =========================================
  // DISPLAY CATEGORY DESCRIPTION
  // =========================================

  const getCategoryDescription = (category) => {
    if (!category) {
      return currentText.allTasksDescription;
    }

    if (category.type === "all") {
      return currentText.allTasksDescription;
    }

    if (category.type === "pending") {
      return currentText.pendingDescription;
    }

    if (category.type === "completed") {
      return currentText.completedDescription;
    }

    if (category.type === "important") {
      return currentText.importantDescription;
    }

    return category.description;
  };

  return (
    <div className="modern-page">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="modern-page-header">

        <div>
          <span className="modern-page-label">
            {currentText.pageLabel}
          </span>

          <h1>
            {currentText.title}
          </h1>

          <p>
            {currentText.description}
          </p>
        </div>

        <button
          type="button"
          className="modern-primary-button"
          onClick={() =>
            setShowCategoryForm(true)
          }
          disabled={showCategoryForm}
        >
          + {currentText.newCategory}
        </button>

      </div>

      {/* =====================================
          NEW CATEGORY FORM
      ====================================== */}

      {showCategoryForm && (
        <div className="category-create-box">

          <div className="category-create-header">

            <div>
              <h2>
                {currentText.createNewCategory}
              </h2>

              <p>
                {currentText.categoryNameDescription}
              </p>
            </div>

            <button
              type="button"
              className="category-close-button"
              onClick={handleCancelCategory}
              aria-label={
                currentText.closeCategoryForm
              }
            >
              ×
            </button>

          </div>

          <form
            className="category-create-form"
            onSubmit={handleCreateCategory}
          >

            <input
              type="text"
              placeholder={
                currentText.categoryPlaceholder
              }
              value={categoryName}
              onChange={(event) =>
                setCategoryName(
                  event.target.value
                )
              }
              autoFocus
            />

            <button
              type="submit"
              className="category-save-button"
            >
              {currentText.createCategory}
            </button>

            <button
              type="button"
              className="category-cancel-button"
              onClick={handleCancelCategory}
            >
              {currentText.cancel}
            </button>

          </form>

        </div>
      )}

      {/* =====================================
          CATEGORY CARDS
      ====================================== */}

      <div className="category-grid">

        {categories.map((category) => {

          const isSelected =
            selectedCategory ===
            category.name;

          return (
            <div
              className={
                isSelected
                  ? "category-card selected"
                  : "category-card"
              }
              key={category.name}
              onClick={() =>
                handleCategoryClick(
                  category.name
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  handleCategoryClick(
                    category.name
                  );
                }
              }}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-content">

                <h2>
                  {getCategoryDisplayName(category)}
                </h2>

                <p>
                  {getCategoryDescription(category)}
                </p>

                <strong>
                  {category.count}{" "}
                  {category.count === 1
                    ? currentText.task
                    : currentText.tasks}
                </strong>

              </div>

              {/* DELETE ONLY CUSTOM CATEGORIES */}

              {category.type === "custom" && (
                <button
                  type="button"
                  className="category-delete-button"
                  onClick={(event) => {
                    event.stopPropagation();

                    handleDeleteCategory(
                      category.name
                    );
                  }}
                >
                  {currentText.delete}
                </button>
              )}

              <span className="category-arrow">
                →
              </span>

            </div>
          );
        })}

      </div>

      {/* =====================================
          SELECTED CATEGORY TASKS
      ====================================== */}

      <div className="category-tasks">

        <div className="category-tasks-header">

          <div>
            <span className="modern-page-label">
              {currentText.selectedCategory}
            </span>

            <h2>
              {getCategoryDisplayName(
                selectedCategoryData
              )}
            </h2>

            <p>
              {getCategoryDescription(
                selectedCategoryData
              )}
            </p>
          </div>

          <span className="category-task-count">
            {filteredTasks.length}{" "}
            {filteredTasks.length === 1
              ? currentText.task
              : currentText.tasks}
          </span>

        </div>

        {filteredTasks.length > 0 ? (

          <div className="category-task-list">

            {filteredTasks.map((task) => (

              <div
                className="category-task-item"
                key={task._id}
              >

                <div
                  className={
                    task.completed
                      ? "category-task-check completed"
                      : "category-task-check"
                  }
                >
                  {task.completed ? "✓" : ""}
                </div>

                <span
                  className={
                    task.completed
                      ? "category-task-text completed"
                      : "category-task-text"
                  }
                >
                  {task.text}
                </span>

              </div>

            ))}

          </div>

        ) : (

          <div className="category-empty">

            <div className="category-empty-icon">
              ✓
            </div>

            <h3>
              {currentText.noTasksHere}
            </h3>

            <p>
              {currentText.noTasksInCategory}
            </p>

          </div>

        )}

      </div>

      {/* =====================================
          INFORMATION CARD
      ====================================== */}

      <div className="category-info">

        <div className="category-info-icon">
          💡
        </div>

        <div>

          <h3>
            {currentText.keepOrganized}
          </h3>

          <p>
            {currentText.categoryInfo}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Categories;
