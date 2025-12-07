# Go Rental — Car Rental Management API

A simple, scalable, and well-structured **Node.js + TypeScript** backend for managing car rentals, users, bookings, and vehicle inventory.  
Built with **Express**, **PostgreSQL**, **JWT authentication**, and following clean, modular architecture principles.

🔗 **Live URL**: _Add your deployed link here (e.g., Render, Railway, Fly.io, etc.)_

📦 **Tech Stack**: Node.js • Express • TypeScript • PostgreSQL • JWT • bcrypt • dayjs

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration (Customer & Admin roles)
- Secure login with JWT
- Password hashing using **bcrypt**
- Role-based access control

### 🚗 Vehicle Management (Admin only)
- Add, update, delete vehicles
- Retrieve all vehicles or filter by:
  - Type (sedan, SUV, etc.)
  - Availability
  - Price range
  - Features

### 📅 Booking Management
- Create rental bookings
- Validation:
  - `rent_start_date` < `rent_end_date`
  - No bookings in the past
  - Prevent overlapping bookings for the same vehicle
- Edit or cancel bookings **only before** the rental start date

### 👤 Customer Features
- View personal active and past bookings
- Update or cancel upcoming bookings
- View rental history

### 🛠 Additional Highlights
- Full **TypeScript** support for type safety
- PostgreSQL with **pg** (node-postgres)
- Date handling using **dayjs**
- Environment variables via **dotenv**
- Clean modular structure (controllers, routes, services, middlewares)

## 🛠 Technology Stack

| Category         | Technologies                              |
|------------------|-------------------------------------------|
| Language         | TypeScript                                |
| Runtime          | Node.js                                   |
| Framework        | Express.js                                |
| Database         | PostgreSQL (`pg`)                         |
| Authentication   | JWT, bcrypt                               |
| Date Library     | dayjs                                     |
| Dev Tools        | ts-node, nodemon, eslint, prettier        |

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/go-rental-api.git
cd go-rental-api