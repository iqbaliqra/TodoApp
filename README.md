# ✅ Full-Stack To-Do List App

A task management app built using **React**, **Node.js**, **MongoDB**, **Firebase**, and **Stripe**, featuring full CRUD operations, payment, and authentication.

---

## ✅ Features Completed

### Authentication (Firebase)
- Firebase Authentication using **Email & Password**
- Email Verification (basic link)
- Password reset via email
- Protected Routes (post-authentication)

---

### 📋 To-Do Management (MongoDB + Express)
- Add, Edit, Delete tasks
- View all tasks with pagination
- Mark tasks as complete/incomplete
- Task includes:
  - Title
  - Description
  - Start Date & Time
  - End Date & Time
  - Is Billed (Boolean)
- Tasks are stored in MongoDB using Mongoose

---

### 💳 Stripe Payment Integration
- One-time payment using **Stripe Checkout**
- After successful payment:
  - `hasPaid` flag is set to `true` in Firebase
  - Protected routes become accessible

---

### User Profile
- View user details (name, email)
- Change password (via Firebase)

---

###  Dashboard UI
- Sidebar navigation
- Topbar with user info and logout
- Task cards:
  - Start/Stop timer
  - Due Date
  - Billed toggle
  - Responsive layout

---

###  Technologies Used

#### Frontend
- React
- React Router
- Axios
- Firebase SDK
- Stripe.js
- Bootstrap

#### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Firebase Admin SDK
- Stripe Node SDK
- dotenv, cors, helmet
