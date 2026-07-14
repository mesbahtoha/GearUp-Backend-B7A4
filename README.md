# 🚀 GearUp Backend API

GearUp is a backend API for a Sports & Outdoor Equipment Rental Platform where customers can rent equipment, providers can manage inventory, and administrators can oversee the entire platform.

---

# 🌐 Live API

Production Server:

https://gearup-backend-b7a4.onrender.com

---

# 🎥 Project Demonstration

Video Walkthrough:

https://drive.google.com/drive/folders/1SB4AbuENTyAGG9thCvpzFmlHz8p043uW

The demo video covers:

- Project Overview
- API Architecture
- Admin Role Demonstration
- Provider Role Demonstration
- Customer Role Demonstration
- CRUD Operations
- Error Handling & Validation
- Technical Challenge Discussion

---

# 🎯 Project Overview

GearUp allows users to:

- Browse sports and outdoor equipment
- Rent equipment for a specific period
- Make secure online payments using Stripe
- Leave reviews after completing rentals
- Manage equipment inventory
- Track rental orders
- Manage users and platform activities through an Admin Panel

---

# 👥 User Roles

## Admin

- Manage categories
- Manage users
- View platform analytics
- Manage rentals
- Manage payments
- Suspend or activate users
- Delete gears

## Provider

- Create gears
- Update gears
- Manage inventory
- View rental orders
- Confirm rentals
- Mark pickups and returns

## Customer

- Browse gears
- Create rentals
- Make payments
- View rental history
- Submit reviews

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL (NeonDB)

## ORM

- Prisma ORM

## Authentication

- JWT (Access Token & Refresh Token)

## Payment Gateway

- Stripe

## Other Packages

- bcryptjs
- cookie-parser
- cors
- dotenv
- http-status
- jsonwebtoken

---

# 📂 Project Structure

```bash
src/
│
├── config/
├── lib/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── category/
│   ├── gear/
│   ├── rental/
│   ├── payment/
│   ├── review/
│   ├── admin/
│   └── dashboard/
│
├── utils/
├── app.ts
└── server.ts
│
prisma/
│
generated/
│
postman/
│   └── GearUp Backand Postman Collections.postman_collection.json
│
README.md
package.json
tsconfig.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/mesbahtoha/GearUp-Backend-B7A4.git
cd GearUp-Backend-B7A4
```

## Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL=YOUR_DATABASE_URL

PORT=5000

CLIENT_URL=http://localhost:3000

BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_publishable_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

---

# 🗄️ Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run Migration:

```bash
npx prisma migrate deploy
```

Seed Database:

```bash
npm run prisma db seed
```

---

# ▶️ Run Project

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

---

# 🔐 Authentication

The API uses JWT Authentication.

Protected Routes require:

```http
Authorization: Bearer ACCESS_TOKEN
```

---

# 👨‍💻 Admin Credentials

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

---

# 📌 API Endpoints

## Authentication

### Login

```http
POST /api/auth/login
```

### Refresh Token

```http
POST /api/auth/refresh-token
```

### Change Password

```http
POST /api/auth/change-password
```

---

## Users

### Register User

```http
POST /api/users/register
```

### Get Profile

```http
GET /api/users/profile
```

### Update Profile

```http
PATCH /api/users/profile
```

---

## Categories

### Create Category

```http
POST /api/categories
```

### Get Categories

```http
GET /api/categories
```

### Update Category

```http
PATCH /api/categories/:id
```

### Delete Category

```http
DELETE /api/categories/:id
```

---

## Gears

### Create Gear

```http
POST /api/gears
```

### Get All Gears

```http
GET /api/gears
```

### Get Single Gear

```http
GET /api/gears/:id
```

### Update Gear

```http
PATCH /api/gears/:id
```

### Delete Gear

```http
DELETE /api/gears/:id
```

### Provider Gears

```http
GET /api/gears/my-gears
```

---

## Rentals

### Create Rental

```http
POST /api/rentals
```

### Customer Rentals

```http
GET /api/rentals/my-rentals
```

### Provider Orders

```http
GET /api/rentals/provider-orders
```

### Confirm Rental

```http
PATCH /api/rentals/:id/confirm
```

### Pickup Rental

```http
PATCH /api/rentals/:id/pickup
```

### Return Rental

```http
PATCH /api/rentals/:id/return
```

---

## Payments

### Create Checkout Session

```http
POST /api/payments/checkout/:rentalId
```

### Stripe Webhook

```http
POST /api/webhooks/stripe
```

---

## Reviews

### Create Review

```http
POST /api/reviews
```

### My Reviews

```http
GET /api/reviews/my-reviews
```

### Gear Reviews

```http
GET /api/reviews/gear/:gearId
```

---

## Admin

### Dashboard

```http
GET /api/admin/dashboard
```

### Users

```http
GET /api/admin/users
```

### Rentals

```http
GET /api/admin/rentals
```

### Payments

```http
GET /api/admin/payments
```

### Suspend User

```http
PATCH /api/admin/users/:id/suspend
```

### Activate User

```http
PATCH /api/admin/users/:id/activate
```

### Delete Gear

```http
DELETE /api/admin/gears/:id
```

---

# 💳 Stripe Test Card

Use the following test card while testing Stripe payments:

```text
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
ZIP: Any valid ZIP
```

---

# 📬 Postman Collection

The complete Postman Collection is included in this repository.

Collection Link:

https://github.com/mesbahtoha/GearUp-Backend-B7A4/blob/main/postman/GearUp%20Backand%20Postman%20Collections.postman_collection.json

Import the collection into Postman to test all available endpoints.

Base URL:

```text
https://gearup-backend-b7a4.onrender.com
```

---

# ✨ Features Implemented

## Authentication & Security

- JWT Authentication
- Refresh Token System
- Role-Based Authorization
- Password Hashing with bcryptjs
- Protected Routes

## User Management

- Customer Registration & Login
- Provider Registration & Login
- Profile Management
- User Suspension & Activation

## Category Management

- Create Category
- Update Category
- Delete Category
- View Categories

## Gear Management

- Create Gear
- Update Gear
- Delete Gear
- Inventory Management
- Search & Filtering
- Pagination Support

## Rental Management

- Create Rental
- Confirm Rental
- Pickup Management
- Return Management
- Rental History

## Payment System

- Stripe Payment Integration
- Checkout Session Creation
- Webhook Event Handling
- Payment Tracking

## Review System

- Create Reviews
- View Gear Reviews
- Customer Review History

## Admin Panel

- Dashboard Analytics
- User Management
- Rental Monitoring
- Payment Monitoring
- Gear Moderation

## Backend Features

- Modular Architecture
- Prisma ORM
- PostgreSQL Database
- Global Error Handling
- Environment Configuration
- RESTful API Design

---

# 🔗 Repository & Live Links

## GitHub Repository

https://github.com/mesbahtoha/GearUp-Backend-B7A4

## Live API

https://gearup-backend-b7a4.onrender.com

## Demo Video

https://drive.google.com/drive/folders/1SB4AbuENTyAGG9thCvpzFmlHz8p043uW

## Postman Collection

https://github.com/mesbahtoha/GearUp-Backend-B7A4/blob/main/postman/GearUp%20Backand%20Postman%20Collections.postman_collection.json

---

# 👨‍💻 Author

**Md. Mesbahul Alam Toha**



