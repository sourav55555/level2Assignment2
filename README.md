Go Rental — Car Rental Management API

A simple and scalable Node.js + TypeScript backend for managing car rentals, users, bookings, and vehicle data.
Built with Express, PostgreSQL, JWT Authentication, and follows clean modular structure.

🔗 Live URL: Add your deployed link here (e.g., Render, Railway, Vercel serverless, etc.)
📦 Tech Stack: Node.js, Express, TypeScript, PostgreSQL

🚀 Features
🔐 Authentication & Authorization

User registration (Customer & Admin roles)

Secure login using JWT

Password hashing with bcrypt

🚗 Vehicle Management

Add, update, delete vehicles (Admin)

Get available vehicles

Filter vehicles by type, availability, price, etc.

📅 Booking Management

Create new rental bookings

Validate date ranges (start < end)

Prevent past date bookings

Only future bookings can be edited/cancelled

👤 Customer Features

View personal bookings

Update booking status (before rent_start_date)

View rental history

📦 Additional

TypeScript for type safety

PostgreSQL database connection using pg

Date handling with dayjs

Environment variable support via dotenv

🛠 Technology Stack
Category	Technologies
Language	TypeScript
Runtime	Node.js
Framework	Express.js
Database	PostgreSQL (pg)
Auth	JWT, bcrypt
Tools	ts-node, nodemon
Date Library	dayjs



⚙️ Setup & Installation
1. Clone the Repository
git clone <your-repo-url>
cd <project-folder>

2. Install Dependencies
npm install

3. Create a .env File

Include:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/your_db
JWT_SECRET=your_secret_key

4. Run in Development Mode
npm run dev

5. Build for Production
npm run build

6. Start Production Server
npm start
