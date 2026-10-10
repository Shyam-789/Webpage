# TASKFLOW — Full-Stack Task Manager

TASKFLOW is a full-stack task management application built as a web development learning project. It combines a React frontend with a Node.js and Express.js backend and MongoDB for data storage.

## Projects

- **Task-manager** — HTML, CSS, and JavaScript frontend.
- **Task-manager-react** — React frontend built with Vite.
- **Task-manager-node** — Node.js and Express.js backend with MongoDB and authentication.

## Features

- User registration and login.
- JWT-based authentication.
- Create, edit, complete, and delete tasks.
- Task management dashboard.
- Task categories.
- User profile page.
- Rating page.
- Customizable application settings.
- Light and dark appearance options.
- Sound and notification preferences.
- Compact mode.
- Language options: English, Bengali, and Hindi.
- 12-hour and 24-hour time formats.
- MongoDB database persistence.

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript
- React
- Vite

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

**Tools**
- Git
- GitHub
- npm

## Project Structure

```text
Webpage/
├── Task manager/
├── Task-manager-react/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
├── Task-manager-node/
│   ├── middleware/
│   ├── models/
│   ├── modules/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Prerequisites

Before running the project, install:

- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- MongoDB Atlas or a local MongoDB server

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shyam-789/Webpage.git
cd Webpage
```

### 2. Set Up the Backend

Open a terminal in the repository root and run:

```bash
cd Task-manager-node
npm install
```

Create a `.env` file inside the `Task-manager-node` folder. Add the environment variables required by your backend code. For example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Make sure these variable names match those used in your backend code. Add any other variables required by your authentication configuration.

Start the backend:

```bash
node server.js
```

The backend should start on the configured port, usually `http://localhost:3000`.

### 3. Set Up the Frontend

Open a **second terminal** in the repository root and run:

```bash
cd Task-manager-react
npm install
```

Create a `.env` file inside the `Task-manager-react` folder:

```env
VITE_API_URL=http://localhost:3000
```

Make sure the URL matches the address where your backend is running.

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173`

## Security Guidelines

- Never upload `.env` files to GitHub.
- Never publish database passwords, JWT secrets, refresh tokens, or access tokens.
- Keep `node_modules` and generated build folders out of GitHub.
- Do not put private credentials in frontend environment variables beginning with `VITE_`; these variables can be exposed to the browser.
- Use strong secrets and configure appropriate authentication and authorization checks.

## GitHub Repository

[View TASKFLOW on GitHub](https://github.com/Shyam-789/Webpage)

## Future Improvements

- Automated testing.
- Deployment to a hosting platform.
- Additional security improvements.
- Accessibility enhancements.
- Further UI and performance improvements.

## License

No license has been specified for this project yet.

---

**TASKFLOW** — A full-stack web development learning project built with React, Node.js, Express.js, and MongoDB.
