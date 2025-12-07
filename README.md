# Go Rental — Car Rental Management API

A simple, scalable, **Node.js + TypeScript** backend for managing car rentals, users, bookings, and vehicle inventory.  
Built with **Express**, **PostgreSQL**, **JWT authentication**, and following modular structure.

🔗 **Live URL**: (https://level2assignment2.onrender.com/)
🔗 **Repo URL**: (https://github.com/sourav55555/level2Assignment2.git)


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
  - Type (car, SUV, etc.)
  - Availability
  - Daily range
  - Features

### 📅 Booking Management
- Create rental bookings
- Validation:
  - `rent_start_date` < `rent_end_date`
  - Prevent overlapping bookings for the same vehicle
- Edit or cancel bookings **only before** the rental start date

### 👤 Customer Features
- View personal active and past bookings
- Update or cancel upcoming bookings

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
git clone https://github.com/sourav55555/level2Assignment2.git
cd go-rental-api


## Create a .env File

Add the following:
CONNECTION_STRING = 
PORT =
SECRET =

## Install Dependencies
npm install

##Run in Development Mode
npm run dev

##Build for Production
npm run build

##Start Production Server
npm start