# LoanLink 💸  
### Microloan Request & Approval Tracker System

## 📖 Overview
LoanLink is a web-based microloan request, review, and approval management system designed for small financial organizations, NGOs, and microloan providers.  
It helps manage loan applications, verification, approvals, EMI tracking, and repayments in a centralized and secure platform.

This system provides separate dashboards for **Users**, **Managers**, and **Admins** with role-based access control and secure authentication.

---

## Demo

Live URL : https://client-11-3146c.web.app

## 🖼️ Screenshots

### Homepage Dashboard
![LoanLink Pro Dashboard](https://i.ibb.co.com/kgXLSpm0/Screenshot-2025-12-30-211641.png)

---

## 🎯 Purpose of the Project

- Allow users to apply for different types of loans  
- Enable Admin & Manager to review and manage loan applications  
- Provide a secure API using JWT authentication  
- Offer role-based dashboards (User, Manager, Admin)  
- Maintain a streamlined loan approval workflow  

---

## 🛠️ Technology Stack

### Frontend
- React.js
- React Router DOM
- Axios
- TanStack Query
- Tailwind CSS
- DaisyUI
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- CORS
- dotenv

---

## ✨ Key Features

- 🔐 **User Registration & Login** (JWT Authentication)  
- 📝 **Loan Application System** (Multiple loan types)  
- 📊 **Loan Status Tracking** (Pending / Approved / Rejected)  
- 🧑‍💼 **Admin Dashboard**
  - View all loan applications  
  - Approve / Reject / Delete loans  
- 🧑‍💻 **Manager Dashboard**
  - Review and manage assigned loans  
- 🛡️ **Role-Based Protected Routes**  
- 🔄 **Secure Axios Interceptors**  
- 📤 **CSV Export** for applied loans  
- 📱 **Fully Responsive UI**

---

## 📦 NPM Packages Used

### Frontend
- react
- react-router-dom
- axios
- @tanstack/react-query
- react-hot-toast
- tailwindcss
- daisyui

### Backend
- express
- mongodb
- jsonwebtoken
- cors
- dotenv

---

## 🚀 Local Development Guide

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn or pnpm
- Git

### Installation Steps

## 1. Clone the Repository
```bash
git clone https://github.com/sanzida-urmi/MovieMaster.git
cd MovieMaster  
```


## 2.  Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

## 3. Environment Variables Setup
Create a .env file in the root directory and add:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 5. Open in Browser
Visit: http://localhost:5173
