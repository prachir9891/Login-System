# Modern Login Dashboard

A full-stack authentication system with a premium UI, secure backend, and interactive dashboard.

## 🚀 Features

- **Modern UI/UX**: Clean 2-column layout with a purple-to-blue gradient theme.
- **Secure Authentication**: JWT-based login and registration.
- **Responsive Design**: Fully mobile-friendly layout using Tailwind CSS v4.
- **Password Visibility**: Toggle to show/hide password in forms.
- **Interactive Dashboard**: Overview of account status, security scores, and recent activity.
- **Form Validation**: Client-side and server-side validation for emails and passwords.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS v4, Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JSON Web Tokens (JWT) & Bcryptjs (Password Hashing).

## 📂 Project Structure

- `/client`: React frontend application.
- `/server`: Express backend API.

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed.
- MongoDB running locally at `mongodb://localhost:27017/login-system`.

### 2. Backend Setup
```bash
cd server
npm install
node index.js
```
*Backend runs on port **5003***.

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Frontend runs on port **5173** (or the next available port)*.

## 👤 Registered Users (Sample)
You can view registered users by running:
```bash
cd server
node fetchUsers.js
```

---
Built with ❤️ by Rupesh
