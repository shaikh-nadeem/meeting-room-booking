# 📅 Meeting Room Booking System (Laravel + React)

A full-stack web application for booking meeting rooms based on real-time availability and subscription limits. Built using **Laravel REST API** (backend) and **React + Bootstrap** (frontend).

---

## 🔧 Features

- ✅ User Registration, Login, Logout (3 failed login attempts lock user for 24 hours)
- ✅ Book meeting rooms with dynamic availability
- ✅ Enforce room capacity and time conflict rules
- ✅ Subscription Plans: Free, Basic, Advance, Premium
- ✅ Daily booking limits based on plan (3 to 10)
- ✅ Upcoming & Past Bookings with Pagination
- ✅ Laravel API + Sanctum + React Bootstrap UI

---

## 🧰 Tech Stack

- **Backend**: Laravel 9 (REST API)
- **Frontend**: React 18 + Bootstrap 5
- **Database**: MySQL
- **Authentication**: Laravel Sanctum (Bearer Token)
- **API**: JSON-based endpoints

---

## 📁 Project Structure

```
meeting-room-booking/
├── backend/         # Laravel API
│   ├── app/
│   ├── database/
│   └── routes/
└── frontend/        # React App
    ├── src/
    └── public/
```

---

## 🚀 Installation Guide

### 1️⃣ Clone Repository

```bash
git clone [https://github.com/shaikh-nadeem/meeting-room-booking.git](https://github.com/shaikh-nadeem/meeting-room-booking.git)
cd meeting-room-booking
```

---

### 2️⃣ Backend Setup (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy .env and generate app key
cp .env.example .env
php artisan key:generate

# Set up DB in .env
DB_DATABASE=meeting_room
DB_USERNAME=root
DB_PASSWORD=yourpassword

# Run migrations & seeders
php artisan migrate --seed

# Copy and paste the below code on .env for sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost

# Start Laravel API server
php artisan serve
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd ../frontend

# Install dependencies
npm install

# Start frontend dev server
npm start
```

---

## 🌱 Seeders

Run:

```bash
php artisan db:seed
```

### MeetingRoomSeeder

Preloads rooms:

| Room Name       | Capacity |
|------------------|----------|
| Meeting Room 1   | 3        |
| Meeting Room 2   | 10       |
| Meeting Room 3   | 15       |
| Meeting Room 4   | 2        |
| Meeting Room 5   | 1        |

### SubscriptionPlanSeeder

Preloads plans:

| Plan     | Daily Limit |
|----------|-------------|
| Free     | 3           |
| Basic    | 5           |
| Advance  | 7           |
| Premium  | 10          |

---

## 🔐 Authentication

- Users register/login to receive a **Bearer token**
- Token is required for all protected API routes
- After 3 failed login attempts, user is locked for 24 hours (rate limiter)

---

## 📡 API Overview

| Method | Endpoint           | Description                         | Auth |
|--------|--------------------|-------------------------------------|------|
| POST   | /register          | Register new user                   | ❌   |
| POST   | /login             | Login, receive token                | ❌   |
| POST   | /logout            | Logout and revoke token             | ✅   |
| GET    | /plans             | List all subscription plans         | ✅   |
| POST   | /subscribe         | Choose a subscription plan          | ✅   |
| POST   | /meetings          | Book a meeting                      | ✅   |
| POST   | /available-rooms   | Get available rooms for selection   | ✅   |
| GET    | /my-meetings       | View own bookings (with filters)    | ✅   |

---

## 🧭 Booking Logic

- Bookings are only allowed in the **future** date
- Duration: 30, 60, or 90 minutes
- Room availability is based on:
  - Time conflict
  - Capacity match
- Booking limits enforced per plan

---

## 🖥️ UI Screens (React + Bootstrap)

- Login / Register Pages
- Book Meeting Form:
  - Name, Date/Time, Duration, Members, Room
- My Bookings View:
  - Past / Upcoming toggle
  - Pagination
- Subscription Plan Selection
