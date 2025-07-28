# 🚀 WorkSync – Employee Management System


---

## 🔗 Relevant Links

🌐 Live Website: [https://worksync-by-imran.web.app/](https://worksync-by-imran.web.app/)

📦 Client Repo: [GitHub - WorkSync Client](https://github.com/programmarimran/WorkSync-client-assignment_12)  
🛠️ Server Repo: [GitHub - WorkSync Server](https://github.com/programmarimran/WorkSync-server-assignment_12)

---

## 📌 Project Overview

WorkSync is a **role-based employee management system** built with the MERN stack and Firebase authentication. It allows HR and Admins to monitor workflow, manage payrolls, handle attendance, and more — all in one system!

---

## 💡 Features

- 🔐 Firebase Authentication with role-based access
- 🔑 JWT Secure Authorization using HTTP-only cookies
- 📝 Employee Work Tracking and Updates
- 📆 Attendance Submission & Record
- 💵 Payroll Requesting and Payment Handling (Stripe)
- 🧑‍💼 HR Dashboard & Admin Summary Panel
- 📬 Contact Form with Admin Review Panel
- 🧠 Built with MVC Pattern using Native MongoDB 

---

## ⚙️ Tech Stack

| Category     | Tools / Libraries                            |
|--------------|----------------------------------------------|
| Frontend     | React, Tailwind CSS, DaisyUI, TanStack Query |
| Backend      | Node.js, Express.js                          |
| Auth         | Firebase, JWT (HTTP-only Cookie)             |
| Database     | MongoDB (Native Driver)                      |
| Payment      | Stripe                                       |
| Others       | dotenv, cors, firebase-admin, moment         |

---

## 🔗 API Endpoints (Routes)

| Method | Endpoint                       | Description                                 | Auth Required |
|--------|--------------------------------|---------------------------------------------|---------------|
| GET    | `/home`                        | Load home page sections                     | ❌            |
| POST   | `/contact-messages`           | Submit contact form                         | ❌            |
| GET    | `/contact-messages`           | Get all contact messages (Admin only)       | ✅            |
| PATCH  | `/contact-messages/:id`       | Mark message as read                        | ✅            |
| POST   | `/users`                      | Register new user                           | ❌            |
| PATCH  | `/users/profile`              | Update user profile                         | ✅            |
| GET    | `/users/user-role/:email`     | Get user role                               | ✅            |
| GET    | `/users/specific/user/:email` | Get specific user data                      | ✅            |
| GET    | `/employees/:slug`            | Employee details                            | ✅            |
| GET    | `/works`                      | Get all work posts                          | ✅            |
| POST   | `/works`                      | Add work post                               | ✅            |
| PATCH  | `/works/:id`                  | Update work                                 | ✅            |
| DELETE | `/works/:id`                  | Delete work                                 | ✅            |
| GET    | `/pay/payment-history/:email`| Get payment history                         | ✅            |
| POST   | `/pay/payroll`               | Request payroll (HR only)                   | ✅            |
| GET    | `/pay/payroll-requests`      | View pending payroll requests (Admin only)  | ✅            |
| PATCH  | `/pay/pay-employee/:id`      | Approve payment                             | ✅            |
| POST   | `/pay/create-payment-intent` | Stripe payment intent                        | ✅            |
| POST   | `/attendance`                | Submit attendance                           | ✅            |
| GET    | `/attendance/my`             | View my attendance history                  | ✅            |
| GET    | `/admin/all-verified-employees` | Admin: View all employees                 | ✅            |
| PATCH  | `/admin/make-hr/:id`         | Promote employee to HR                      | ✅            |
| PATCH  | `/admin/fire-employee/:id`   | Fire employee                               | ✅            |
| PATCH  | `/admin/adjust-salary/:id`   | Adjust salary                               | ✅            |
| GET    | `/admin/dashboard-stats`     | Admin dashboard summary                     | ✅            |
| GET    | `/hr/dashboard/summary`      | HR dashboard summary                        | ✅            |
| GET    | `/hr/progress`               | HR view employee progress                   | ✅            |

---

## 🌱 Environment Variables

Create a `.env` file in the root of the server project:

```env
PORT=3000
CLIENT_URL=https://work-sync-by-imran.web.app
CONNECT_MONGODB=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## 🛠️ Getting Started (Local Setup)

```bash
# Clone the repository
git clone https://github.com/programmarimran/workSync-server-assignment12.git
cd workSync-server-assignment12

# Install dependencies
npm install

# Add .env file (see above)

# Start server
npm run dev
```

---

## 👨‍💻 Developer Information

| Detail         | Info                                            |
|----------------|--------------------------------------------------|
| 👨‍💻 Developer | Md Imran Hasan                                   |
| 💼 Role        | React & MERN Stack Web Developer, JavaScript Lover |
| 📬 Email       | programmarimran@gmail.com                        |
| 🌐 Portfolio   | https://imran-dev-portfolio.vercel.app/                                     |

---

> 📢 **Note:** This project follows MVC pattern and uses Firebase Auth + Native MongoDB .

