const http = require("http");

const {
  getTasks,
  addTask,
  editTask,
  toggleTask,
  deleteTask,
  clearTasks
} = require("./modules/taskManager");

// Send JSON response
function sendJSON(response, statusCode, data) {
  response.statusCode = statusCode;

  response.setHeader(
    "Content-Type",
    "application/json"
  );

  response.end(JSON.stringify(data));
}

// Create server
const server = http.createServer((request, response) => {

  response.setHeader(
  "Access-Control-Allow-Origin",
  "*"
);

response.setHeader(
  "Access-Control-Allow-Methods",
  "GET, POST, PUT, PATCH, DELETE, OPTIONS"
);

response.setHeader(
  "Access-Control-Allow-Headers",
  "Content-Type"
);

if (request.method === "OPTIONS") {
  response.statusCode = 204;
  response.end();
  return;
}

  // =========================
  // GET ALL TASKS
  // =========================

  if (
    request.method === "GET" &&
    request.url === "/tasks"
  ) {
    const tasks = getTasks();

    sendJSON(response, 200, tasks);

    return;
  }

  // =========================
  // ADD TASK
  // =========================

  if (
    request.method === "POST" &&
    request.url === "/tasks"
  ) {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.text || data.text.trim() === "") {
          sendJSON(response, 400, {
            message: "Task text is required"
          });

          return;
        }

        const task = addTask(data.text.trim());

        sendJSON(response, 201, task);

      } catch (error) {
        sendJSON(response, 400, {
          message: "Invalid JSON"
        });
      }
    });

    return;
  }

  // =========================
  // EDIT TASK
  // =========================

  if (
    request.method === "PUT" &&
    request.url.startsWith("/tasks/")
  ) {
    const id = Number(
      request.url.split("/")[2]
    );

    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.text || data.text.trim() === "") {
          sendJSON(response, 400, {
            message: "Task text is required"
          });

          return;
        }

        editTask(id, data.text.trim());

        sendJSON(response, 200, {
          message: "Task edited successfully"
        });

      } catch (error) {
        sendJSON(response, 400, {
          message: "Invalid JSON"
        });
      }
    });

    return;
  }

  // =========================
  // TOGGLE TASK
  // =========================

  if (
    request.method === "PATCH" &&
    request.url.startsWith("/tasks/")
  ) {
    const id = Number(
      request.url.split("/")[2]
    );

    toggleTask(id);

    sendJSON(response, 200, {
      message: "Task status updated"
    });

    return;
  }

  // =========================
  // DELETE ONE TASK
  // =========================

  if (
    request.method === "DELETE" &&
    request.url.startsWith("/tasks/")
  ) {
    const id = Number(
      request.url.split("/")[2]
    );

    deleteTask(id);

    sendJSON(response, 200, {
      message: "Task deleted successfully"
    });

    return;
  }

  // =========================
  // DELETE ALL TASKS
  // =========================

  if (
    request.method === "DELETE" &&
    request.url === "/tasks"
  ) {
    clearTasks();

    sendJSON(response, 200, {
      message: "All tasks deleted"
    });

    return;
  }

  // =========================
  // HOME
  // =========================

  if (
    request.method === "GET" &&
    request.url === "/"
  ) {
    sendJSON(response, 200, {
      message: "Task Manager API is running"
    });

    return;
  }

  // =========================
  // 404
  // =========================

  sendJSON(response, 404, {
    message: "Route not found"
  });
});

// Start server
server.listen(3000, () => {
  console.log(
    "Server running at http://localhost:3000"
  );
});