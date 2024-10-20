# To-do List

## Description

This project is a full-stack **To-do List App** built using **React (TypeScript)** for the frontend and **Node.js/Express (TypeScript)** for the backend. The application integrates **MongoDB** for data storage. It allows users to:

- Create, view, edit, and delete tasks.
- Search tasks by title.
- Filter tasks by status (All, Completed, Incomplete).

Security enhancements such as **Helmet**, **CORS**, **Rate Limiting**, and **Morgan** are applied to the backend to ensure secure and reliable API endpoints.

---

## Features

#### Backend

- **Node.js** with **TypeScript** and **Express**.
- **MongoDB** for task data storage.
- API for task management: Create, Update, Delete, and Fetch tasks.
- Search and filter tasks based on title and completion status.
- **Helmet**, **CORS**, **Rate Limiting**, and **Morgan** for security.

#### Frontend

- **React** with **TypeScript**.
- **Material-UI (MUI)** for the user interface.
- Task creation, completion, deletion, and filtering (all, completed, incomplete).
- Responsive design for mobile and desktop views.
- Uses **Axios** to communicate with the backend API.

## Folder Structure

```
/todo-app
├── backend
│   ├── dist/                     # Compiled TypeScript files
│   ├── node_modules/             # Node.js dependencies
│   ├── src/
│   │   ├── config/
│   │   │   └── dbConfig.ts       # MongoDB connection setup
│   │   ├── controllers/
│   │   │   └── taskController.ts # Task controller (CRUD operations)
│   │   ├── middlewares/
│   │   │   └── rateLimiter.ts    # Rate limiting middleware
│   │   ├── models/
│   │   │   └── Task.ts           # Task model schema
│   │   ├── routes/
│   │   │   └── taskRouter.ts     # Task API routes
│   │   ├── utils/
│   │   │   └── types.d.ts        # TypeScript utility types
│   │   └── index.ts              # Express server setup
│   ├── .env                      # Environment variables
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json              # TypeScript configuration
│   └── README.md                  # Backend-specific README
├── frontend
│   ├── node_modules/              # Frontend dependencies
│   ├── public/                    # Public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskContext.tsx    # Task context and state management
│   │   │   ├── TaskFilter.tsx     # Task filtering component
│   │   │   ├── TaskForm.tsx       # Task creation form
│   │   │   └── TaskList.tsx       # Task list display
│   │   ├── services/
│   │   │   └── apiService.ts      # Axios API service
│   │   ├── types/
│   │   │   └── Types.d.ts         # TypeScript types
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx              # React entry point
│   │   ├── logo.svg
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   ├── .env                       # Environment variables for frontend
│   ├── .gitignore                 # Files to ignore in Git
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json              # TypeScript configuration
│   └── README.md                  # Frontend-specific README
├── .gitignore                     # Global Git ignore settings
├── LICENSE                        # License information
└── README.md                      # Full project README
```

## Installation and Setup

### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14+)
- **npm** (v6+)
- **MongoDB** (MongoDB Atlas or Local instance)

### 1. Clone the Repository

To get started, clone this repository:

```bash
git clone https://github.com/itsRkator/to-do-list.git
cd to-do-list
```

---

## Backend Setup

### 2.1 Navigate to the backend folder:

```bash
cd backend
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Setup Environment Variables

Create a `.env` file in the `backend` folder and add the following:

```bash
MONGO_URI=<DB_URI>
PORT=8000
```

Replace `<username>` and `<password>` with your **MongoDB** credentials.

### 2.4 Running the Backend

To run the backend server, use the following command:

```bash
npm run start // Native approach don\'t get restart
npm run start:dev // Nodemon auto restart
```

This will start the backend at `http://localhost:8000`.

---

## Frontend Setup

### 3.1 Navigate to the frontend folder:

```bash
cd ../frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Running the Frontend

To start the frontend development server, run:

```bash
npm start
```

The frontend will be served at `http://localhost:3000`.

---

## Usage

After setting up both the backend and frontend, you can access the To-do List application by navigating to `http://localhost:3000` in your browser.

The app allows you to:

- Add tasks
- Mark tasks as completed
- Delete tasks
- Search for tasks by title
- Filter tasks by "all", "completed", or "incomplete"

---

## Backend API Endpoints

| Method | Endpoint         | Description                                       |
| ------ | ---------------- | ------------------------------------------------- |
| GET    | `/api/tasks`     | Fetch all tasks (with optional search and filter) |
| POST   | `/api/tasks`     | Create a new task                                 |
| PATCH  | `/api/tasks/:id` | Update task status (completed/incomplete)         |
| DELETE | `/api/tasks/:id` | Delete a task                                     |

### Query Parameters for `/api/tasks`:

- `search`: Search tasks by title (e.g., `/api/tasks?search=home`).
- `status`: Filter tasks by completion status (`completed` or `incomplete`).

---

## Security Features

### Backend Security

The backend includes several security measures:

- **Helmet**: Adds HTTP headers to improve security.
- **CORS**: Configured to allow requests from the specified origin (`http://localhost:3000` by default).
- **Rate Limiting**: Limits the number of requests from an IP to prevent brute-force attacks.
- **Morgan**: Logs HTTP requests for monitoring and debugging.

---

## Testing the API

You can use tools like **Postman** or **cURL** to test the backend API endpoints:

- **Get all tasks**:

  ```bash
  GET http://localhost:5000/api/tasks
  ```

- **Search for tasks**:

  ```bash
  GET http://localhost:5000/api/tasks?search=example
  ```

- **Filter by status**:

  ```bash
  GET http://localhost:5000/api/tasks?status=completed
  ```

- **Create new Task**:

  ```bash
  curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
  "title": "My New Task"
  }'
  ```

- **Update by ID**:

  ```bash
  curl -X PATCH http://localhost:5000/api/tasks/<task-id> \
  -H "Content-Type: application/json" \
  -d '{
  "completed": true
  }'
  ```

- **Delete by ID**:

  ```bash
  curl -X DELETE http://localhost:5000/api/tasks/<task-id>
  ```

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Enhancements Required

- Add **user authentication** to associate tasks with specific users.
- Implement **pagination** in the task list.
- Add **automated testing** using **Jest** for the backend and **React Testing Library** for the frontend.
