
/* =========================================================
   TASK MANAGER
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. GET HTML ELEMENTS
   ========================================================= */

// Task form
const taskForm = document.getElementById("taskForm");

// Task input
const taskInput = document.getElementById("taskInput");

// Task description
const taskDescription = document.getElementById("taskDescription");

// Task priority
const taskPriority = document.getElementById("taskPriority");

// Task date
const taskDate = document.getElementById("taskDate");

// Task list
const taskList = document.getElementById("taskList");

// Task counters
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

// Clear button
const clearBtn = document.getElementById("clearBtn");

// Login form
const loginForm = document.getElementById("loginForm");

// Register form
const registerForm = document.getElementById("registerForm");

// Forgot password form
const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

// Contact form
const contactForm =
    document.getElementById("contactForm");


/* =========================================================
   2. LOAD TASKS FROM LOCAL STORAGE
   ========================================================= */

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


/* =========================================================
   3. CURRENT EDITING TASK
   ========================================================= */

let editingTaskId = null;


/* =========================================================
   4. SAVE TASKS TO LOCAL STORAGE
   ========================================================= */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


/* =========================================================
   5. CREATE UNIQUE TASK ID
   ========================================================= */

function createTaskId() {

    return Date.now();
}


/* =========================================================
   6. DISPLAY TASKS
   ========================================================= */

function displayTasks() {

    // Remove old tasks
    taskList.innerHTML = "";


    // Check if there are no tasks
    if (tasks.length === 0) {

        const emptyMessage =
            document.createElement("li");

        emptyMessage.className =
            "empty-message";

        emptyMessage.textContent =
            "No tasks available. Add your first task!";

        taskList.appendChild(emptyMessage);

        updateStatistics();

        return;
    }


    // Create every task
    tasks.forEach(function(task) {

        createTaskElement(task);

    });


    // Update statistics
    updateStatistics();
}


/* =========================================================
   7. CREATE TASK ELEMENT
   ========================================================= */

function createTaskElement(task) {

    // Main list item
    const li =
        document.createElement("li");


    // Add task ID
    li.dataset.id = task.id;


    // =====================================================
    // LEFT SIDE
    // =====================================================

    const leftDiv =
        document.createElement("div");


    // Checkbox
    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className =
        "task-checkbox";

    checkbox.checked =
        task.completed;


    // Checkbox event
    checkbox.addEventListener(
        "change",
        function() {

            toggleTask(task.id);

        }
    );


    // Task text
    const taskText =
        document.createElement("span");

    taskText.textContent =
        task.text;


    // Completed task styling
    if (task.completed) {

        taskText.style.textDecoration =
            "line-through";

        taskText.style.opacity =
            "0.6";
    }


    // Add checkbox + text
    leftDiv.appendChild(checkbox);

    leftDiv.appendChild(taskText);


    // =====================================================
    // RIGHT SIDE
    // =====================================================

    const rightDiv =
        document.createElement("div");


    // Edit button
    const editButton =
        document.createElement("button");

    editButton.type = "button";

    editButton.className =
        "edit-btn";

    editButton.textContent =
        "Edit";


    // Edit event
    editButton.addEventListener(
        "click",
        function() {

            editTask(task.id);

        }
    );


    // Delete button
    const deleteButton =
        document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className =
        "delete-btn";

    deleteButton.textContent =
        "Delete";


    // Delete event
    deleteButton.addEventListener(
        "click",
        function() {

            deleteTask(task.id);

        }
    );


    // Add buttons
    rightDiv.appendChild(editButton);

    rightDiv.appendChild(deleteButton);


    // Add everything to LI
    li.appendChild(leftDiv);

    li.appendChild(rightDiv);


    // Add task to list
    taskList.appendChild(li);
}


/* =========================================================
   8. ADD TASK
   ========================================================= */

taskForm.addEventListener(
    "submit",
    function(event) {

        // Stop page reload
        event.preventDefault();


        // Get values
        const text =
            taskInput.value.trim();

        const description =
            taskDescription.value.trim();

        const priority =
            taskPriority.value;

        const date =
            taskDate.value;


        // Check task name
        if (text === "") {

            alert("Please enter a task.");

            return;
        }


        // =================================================
        // EDIT EXISTING TASK
        // =================================================

        if (editingTaskId !== null) {

            const task =
                tasks.find(function(item) {

                    return item.id === editingTaskId;

                });


            if (task) {

                task.text =
                    text;

                task.description =
                    description;

                task.priority =
                    priority;

                task.date =
                    date;
            }


            // Reset editing mode
            editingTaskId = null;


            // Change button text
            const submitButton =
                taskForm.querySelector(
                    'button[type="submit"]'
                );

            submitButton.textContent =
                "Add Task";


        } else {


            // =============================================
            // CREATE NEW TASK
            // =============================================

            const newTask = {

                id: createTaskId(),

                text: text,

                description: description,

                priority: priority,

                date: date,

                completed: false,

                createdAt:
                    new Date().toISOString()

            };


            // Add task
            tasks.push(newTask);
        }


        // Save
        saveTasks();


        // Display
        displayTasks();


        // Clear form
        taskForm.reset();


        // Restore default priority
        taskPriority.value =
            "medium";

    }
);


/* =========================================================
   9. EDIT TASK
   ========================================================= */

function editTask(id) {

    const task =
        tasks.find(function(item) {

            return item.id === id;

        });


    if (!task) {

        return;
    }


    // Put task data into form
    taskInput.value =
        task.text;

    taskDescription.value =
        task.description || "";

    taskPriority.value =
        task.priority || "medium";

    taskDate.value =
        task.date || "";


    // Set editing ID
    editingTaskId =
        id;


    // Change button
    const submitButton =
        taskForm.querySelector(
            'button[type="submit"]'
        );

    submitButton.textContent =
        "Update Task";


    // Scroll to form
    taskForm.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });
}


/* =========================================================
   10. DELETE TASK
   ========================================================= */

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {

        return;
    }


    // Remove task
    tasks =
        tasks.filter(function(task) {

            return task.id !== id;

        });


    // Save
    saveTasks();


    // Display
    displayTasks();
}


/* =========================================================
   11. COMPLETE / UNCOMPLETE TASK
   ========================================================= */

function toggleTask(id) {

    const task =
        tasks.find(function(item) {

            return item.id === id;

        });


    if (!task) {

        return;
    }


    // Change completed status
    task.completed =
        !task.completed;


    // Save
    saveTasks();


    // Display
    displayTasks();
}


/* =========================================================
   12. UPDATE STATISTICS
   ========================================================= */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(function(task) {

            return task.completed === true;

        }).length;


    const pending =
        total - completed;


    // Update HTML
    taskCount.textContent =
        total;

    completedCount.textContent =
        completed;

    pendingCount.textContent =
        pending;
}


/* =========================================================
   13. CLEAR ALL TASKS
   ========================================================= */

clearBtn.addEventListener(
    "click",
    function() {

        // Check if tasks exist
        if (tasks.length === 0) {

            alert("There are no tasks to clear.");

            return;
        }


        // Confirmation
        const confirmClear =
            confirm(
                "Are you sure you want to delete all tasks?"
            );


        if (!confirmClear) {

            return;
        }


        // Empty array
        tasks = [];


        // Save
        saveTasks();


        // Display
        displayTasks();
    }
);


/* =========================================================
   14. REGISTER FORM
   ========================================================= */

registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Get values
        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        const terms =
            document.getElementById(
                "terms"
            ).checked;


        // Check terms
        if (!terms) {

            alert(
                "Please accept the Terms and Conditions."
            );

            return;
        }


        // Check password
        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            return;
        }


        // Get users
        let users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // Check existing email
        const existingUser =
            users.find(function(user) {

                return user.email === email;

            });


        if (existingUser) {

            alert(
                "An account with this email already exists."
            );

            return;
        }


        // Create user
        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password

        };


        // Save user
        users.push(newUser);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        alert(
            "Account created successfully!"
        );


        // Clear form
        registerForm.reset();


        // Go to login
        window.location.hash =
            "login";
    }
);


/* =========================================================
   15. LOGIN FORM
   ========================================================= */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Get values
        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        // Get users
        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // Find user
        const user =
            users.find(function(item) {

                return (
                    item.email === email &&
                    item.password === password
                );

            });


        // Check login
        if (!user) {

            alert(
                "Invalid email or password."
            );

            return;
        }


        // Save logged-in user
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        alert(
            "Login successful! Welcome " +
            user.name
        );


        // Clear form
        loginForm.reset();


        // Go to tasks
        window.location.hash =
            "tasks";
    }
);


/* =========================================================
   16. FORGOT PASSWORD FORM
   ========================================================= */

forgotPasswordForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "forgotEmail"
            ).value.trim();


        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        const user =
            users.find(function(item) {

                return item.email === email;

            });


        if (!user) {

            alert(
                "No account found with this email."
            );

            return;
        }


        /*
           This is only a frontend demo.

           In the final full-stack version,
           password reset will be handled
           securely by Node.js + Express.js
           + database + email service.
        */

        alert(
            "Password reset functionality will be connected to the backend in the final version."
        );


        forgotPasswordForm.reset();
    }
);


/* =========================================================
   17. CONTACT FORM
   ========================================================= */

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "contactName"
            ).value.trim();


        const email =
            document.getElementById(
                "contactEmail"
            ).value.trim();


        const subject =
            document.getElementById(
                "contactSubject"
            ).value.trim();


        const message =
            document.getElementById(
                "contactMessage"
            ).value.trim();


        // Basic validation
        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert(
                "Please fill in all fields."
            );

            return;
        }


        // Save contact message
        let messages =
            JSON.parse(
                localStorage.getItem("messages")
            ) || [];


        const newMessage = {

            id: Date.now(),

            name: name,

            email: email,

            subject: subject,

            message: message,

            createdAt:
                new Date().toISOString()

        };


        messages.push(newMessage);


        localStorage.setItem(
            "messages",
            JSON.stringify(messages)
        );


        alert(
            "Your message has been sent successfully!"
        );


        // Clear form
        contactForm.reset();
    }
);


/* =========================================================
   18. NAVIGATION SMOOTH SCROLL
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    link.getAttribute("href");


                // Ignore empty #
                if (
                    targetId === "#" ||
                    targetId === ""
                ) {

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });


                    // Update URL hash
                    history.pushState(
                        null,
                        "",
                        targetId
                    );
                }

            }
        );

    });


/* =========================================================
   19. KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        /*
           Ctrl + Enter
           = submit task form
        */

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            taskForm.requestSubmit();

        }

    }
);


/* =========================================================
   20. PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Display stored tasks
        displayTasks();

        // Update statistics
        updateStatistics();

    }
);


/* =========================================================
   21. CHECK LOGIN STATUS
   ========================================================= */

function checkLoginStatus() {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    if (loggedInUser) {

        console.log(
            "Logged in as:",
            loggedInUser.name
        );

    } else {

        console.log(
            "No user is currently logged in."
        );
    }
}


/* =========================================================
   22. RUN LOGIN CHECK
   ========================================================= */

checkLoginStatus();

