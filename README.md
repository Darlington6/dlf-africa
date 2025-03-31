# **DLF Africa** 🌍🚀  

**DLF Africa** is a web platform dedicated to bridging the digital divide by providing digital literacy training, mentorship programs, and access to online learning resources.  

---

## **Table of Contents**  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Project Structure](#project-structure)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Environment Variables Setup](#environment-variables-setup)  
- [Running the Application](#running-the-application)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## **Features**  
✅ User authentication (Email, Google Sign-In)  
✅ Course enrollment system  
✅ Mentorship portal  
✅ Payment integration for donations (Paystack)  
✅ Secure API routes with JWT authentication  

---

## **Technologies Used**  

### **Frontend**  
- **React.js** (UI framework)  
- **Google Authentication** (User authentication)  
- **CSS** (Styling)  

### **Backend**  
- **Node.js** (Runtime)  
- **Express.js** (Backend framework)  
- **MongoDB** (Database)  
- **Mongoose** (ODM for MongoDB)  
- **Paystack** (Donation payment processing)  
- **Dotenv** (Environment variable management)  

---

## **Project Structure**  
```bash
DLF-Africa/
│── backend/           # Backend API (Node.js + Express)
│── frontend/          # Frontend (React + Vite)
│── .gitignore
│── README.md
└── package.json       # Project metadata
Prerequisites
Before proceeding, ensure you have the following installed:

Node.js (v18 or later) - Download here

MongoDB (Local or MongoDB Atlas) - Download here

Git - Download here

Installation
1. Clone the Repository
git clone https://github.com/Darlington6/dlf-africa.git
cd dlf-africa

2. Install Dependencies
Backend Setup
cd backend
npm install

Frontend Setup
Open a new terminal and run:
cd frontend
npm install

Environment Variables Setup
You need to configure environment variables for both the backend and frontend.

Backend (backend/.env)
Create a .env file in the backend folder and add:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
PAYSTACK_SECRET_KEY=your_paystack_secret

Frontend (frontend/.env)
Create a .env file in the frontend folder and add:
REACT_APP_API_URL=http://localhost:5000

🔹 Replace the values with your actual credentials.
🔹 Do not share your .env files or push them to GitHub.

Running the Application
Backend
Start the backend server:
cd backend
npm start
The API should be running at:
http://localhost:5000

Frontend
Start the frontend:
cd frontend
npm run dev
You can access the web app at:
http://localhost:5173

Deployment
Backend (Render)
Push code to GitHub

Create a new Web Service on Render

Connect your GitHub Repository

Set the Build Command:
npm install
Set the Start Command:
npm start
Configure Environment Variables in Render’s dashboard

Deploy and Test! 🎉

Frontend (Vercel)
Push the frontend code to GitHub

Create a new project on Vercel

Connect your GitHub Repository

Set the Environment Variables on Vercel

Deploy! 🎉

Contributing
Fork the repository

Create a new branch
git checkout -b feature-name

Commit your changes
git commit -m "Added feature"

Push to the branch
git push origin feature-name

Open a Pull Request

License
This project is licensed under the MIT License.

📌 DLF Africa is committed to bridging the digital divide. Thank you for contributing to our mission! 🚀🌍
