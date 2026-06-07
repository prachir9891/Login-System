# Modern Login Dashboard

A full-stack authentication system with a premium UI, secure backend, and interactive dashboard.

## 🚀 Features

- **Modern UI/UX**: Clean 2-column layout with a purple-to-blue gradient theme.
- **Secure Authentication**: JWT-based login and registration.
- **Google OAuth**: Integrated Google Login for seamless authentication.
- **Responsive Design**: Fully mobile-friendly layout using Tailwind CSS v4.
- **Password Visibility**: Toggle to show/hide password in forms.
- **Interactive Dashboard**: Overview of account status, security scores, and recent activity.
- **Form Validation**: Client-side and server-side validation for emails and passwords.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS v4, Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose).
- **Authentication**: JSON Web Tokens (JWT), Bcryptjs (Password Hashing), and Google OAuth 2.0.

## 📂 Project Structure

- `/client`: React frontend application.
- `/server`: Express backend API.

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed.
- MongoDB Atlas cluster configured.

### 2. Backend Setup
The backend is configured to run on port **5035**.
```bash
cd server
npm install
npm start
```
*Note: Ensure your MongoDB Atlas IP Whitelist includes your current IP address.*

### 3. Frontend Setup
The frontend is configured to communicate with the backend on port **5035**.
```bash
cd client
npm install
npm run dev
```
*Frontend typically runs on port **5175***.

## 👤 Database Management
You can view all registered users (excluding passwords) by running:
```bash
cd server
node fetchUsers.js
```

## 🔧 Current Project Status
- **Backend Port**: 5035
- **Frontend Port**: 5175
- **Database**: Connected to `login-system` cluster on MongoDB Atlas.
- **Email Normalization**: Login and Registration now handle case-insensitive emails.
- **Auto-Port Recovery**: The server includes logic to try the next available port if 5030 is busy.

## 🚀 Deployment (Render)

This project is configured for easy deployment on [Render](https://render.com/).

### 1. Create a New Web Service
- Connect your GitHub repository to Render.
- Select **Node.js** as the runtime.

### 2. Configure Build and Start Settings
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 3. Add Environment Variables
Add the following keys in the Render dashboard (**Environment** section):
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A secure random string for tokens.
- `NODE_ENV`: `production`
- `GOOGLE_CLIENT_ID`: (Optional) Your Google OAuth Client ID.

---
Built with ❤️ by Prachi
