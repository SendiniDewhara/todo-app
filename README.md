

# ✅ Todo App – Full-Stack Task Manager

A modern full-stack **Todo Application** built with **React** and **Node.js**, using **MongoDB Atlas** for data persistence. This application allows users to manage tasks efficiently with features like priority levels, status filtering, and a beautiful responsive UI.

---

## 🚀 Live Demo

👉 https://youtu.be/OUZH0qNnNvg

---

## 📌 Features

- ✍️ Create and delete tasks
- ✅ Mark tasks as completed or not completed
- 🟢 Add priority levels (High, Medium, Low) with color-coded badges
- 🔍 Filter tasks by status: All, Completed, Not Completed
- 🔄 Real-time state updates
- 🌐 RESTful API with full CRUD operations
- 🧾 MongoDB Atlas for cloud-based data storage

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| 🎨 Frontend   | React, Vite, Material UI (MUI), Emotion, Framer Motion |
| 🧠 Backend    | Node.js, Express.js                  |
| 🛢️ Database   | MongoDB Atlas                        |
| 📦 Tooling    | Vite, ESLint, Toastify, Postman      |
| ☁️ Deployment | (Suggest: Vercel for frontend, Render/Heroku for backend) |

---

## 📁 Project Structure


todo-app/
├── client/              # Frontend (React + MUI)
│   └── ...
├── server/              # Backend (Node.js + Express + MongoDB)
│   └── ...
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repo

bash
git clone https://github.com/SendiniDewhara/todo-app.git
cd todo-app


---

### 2. Setup the backend

bash
cd server
npm install


#### 🔐 Environment Variables (`.env`)
Create a `.env` file inside `/server`:

env
PORT=5000
MONGO_URI=mongodb+srv://user1:12345@cluster0.fhuiewd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


```bash
npm run dev


---

### 3. Setup the frontend

bash
cd ../client
npm install
npm run dev


---

## 🧪 Postman API Testing

Use [Postman](https://postman.com) to test the following endpoints:

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| GET    | /api/todos        | Fetch all todos     |
| POST   | /api/todos        | Create a new todo   |
| PUT    | /api/todos/:id    | Update a todo       |
| DELETE | /api/todos/:id    | Delete a todo       |

Sample POST Body:
json
{
  "title": "Finish project",
  "completed": false,
  "priority": "High"
}


---

## 🔒 License

This project is licensed under the *MIT License*.  
You can freely use, distribute, and modify it with attribution.

---

## ✨ Future Improvements

- 🔐 User authentication with JWT
- 📱 PWA & mobile-first enhancements
- 🗃️ Sort by due dates
- 🔔 Email or notification reminders

---

## 👨‍💻 Developer

*Sendini Dewhara*  
📧 sendinidewhara@gmail.com  
🌐 [GitHub Profile](https://github.com/SendiniDewhara)

---

> ⭐ Don’t forget to star the repo if you like this project!
```

---

Would you like me to help you create a .env.example, sample Postman collection, or even deployment steps for Vercel + Render or another service?

