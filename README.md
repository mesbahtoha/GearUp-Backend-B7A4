# 🚀 GearUp Backend API

GearUp is a backend API for a Sports & Outdoor Equipment Rental Platform where customers can rent equipment, providers can manage inventory, and administrators can oversee the entire platform.

---

# 🌐 Live API

Production Server:

https://gearup-backend-b7a4.onrender.com

---

# 🎥 Demo Video

https://drive.google.com/drive/folders/1SB4AbuENTyAGG9thCvpzFmlHz8p043uW

---

# 📬 Postman Collection

Postman Collection:

https://github.com/mesbahtoha/GearUp-Backend-B7A4/blob/main/postman/GearUp%20Backand%20Postman%20Collections.postman_collection.json

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
- View dashboard statistics
- View all rentals
- View all payments
- Suspend users
- Activate users
- Change user roles
- Delete gears

## Provider

- Create gears
- Update gears
- Delete gears
- View own gears
- View rental orders
- Confirm orders
- Mark pickup status
- Mark return status

## Customer

- Browse gears
- Create rentals
- View rental history
- Make payments
- Create reviews
- Update reviews
- Delete reviews

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

- JWT Authentication
- Access Token
- Refresh Token

## Payment Gateway

- Stripe

## Other Packages

- bcryptjs
- cors
- cookie-parser
- dotenv
- jsonwebtoken
- http-status

---

# 📂 Project Structure

```bash
gearup-backend/
│
├── src/
│   ├── config/
│   ├── lib/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── category/
│   │   ├── gear/
│   │   ├── rental/
│   │   ├── payment/
│   │   ├── review/
│   │   ├── admin/
│   │   └── dashboard/
│   │
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│
├── postman/
│   └── GearUp Backand Postman Collections.postman_collection.json
│
├── package.json
├── tsconfig.json
└── README.md
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

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate deploy
```

Seed Database

```bash
npx prisma db seed
```

---

# ▶️ Run Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

# 🔐 Authentication

Protected routes require:

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

# Root

### Server Check

```http
GET /
```

---

# Authentication

## Login

```http
POST /api/auth/login
```

## Refresh Token

```http
POST /api/auth/refresh-token
```

## Logout

```http
POST /api/auth/logout
```

## Change Password

```http
PATCH /api/auth/change-password
```

---

# Users

## Register User

```http
POST /api/users/register
```

## My Profile

```http
GET /api/users/me
```

## Update Profile

```http
PUT /api/users/my-profile
```

---

# Categories

## Create Category

```http
POST /api/categories
```

## Get All Categories

```http
GET /api/categories
```

## Get Single Category

```http
GET /api/categories/:id
```

## Update Category

```http
PATCH /api/categories/:id
```

## Delete Category

```http
DELETE /api/categories/:id
```

---

# Gears

## Create Gear

```http
POST /api/gears
```

## Get All Gears

```http
GET /api/gears
```

## Get Single Gear

```http
GET /api/gears/:id
```

## Get My Gears

```http
GET /api/gears/my-gears
```

## Update Gear

```http
PATCH /api/gears/:id
```

## Delete Gear

```http
DELETE /api/gears/:id
```

---

# Rentals

## Create Rental

```http
POST /api/rentals
```

## My Rentals

```http
GET /api/rentals/my-rentals
```

## Provider Orders

```http
GET /api/rentals/provider-orders
```

## Get Single Rental

```http
GET /api/rentals/:id
```

## Get All Rentals (Admin)

```http
GET /api/rentals/all
```

## Confirm Order

```http
PATCH /api/rentals/:id/confirm
```

## Pickup Order

```http
PATCH /api/rentals/:id/pickup
```

## Return Order

```http
PATCH /api/rentals/:id/return
```

## Cancel Order

```http
PATCH /api/rentals/:id/cancel
```

---

# Payments

## Create Checkout Session

```http
POST /api/payments/checkout/:rentalId
```

## Stripe Webhook

```http
POST /api/webhooks/stripe
```

---

# Reviews

## Create Review

```http
POST /api/reviews
```

## My Reviews

```http
GET /api/reviews/my-reviews
```

## Get All Reviews

```http
GET /api/reviews/all
```

## Gear Reviews

```http
GET /api/reviews/gear/:gearId
```

## Update Review

```http
PATCH /api/reviews/:id
```

## Delete Review

```http
DELETE /api/reviews/:id
```

---

# Dashboard

## Provider Dashboard

```http
GET /api/dashboard/provider
```

## Customer Dashboard

```http
GET /api/dashboard/customer
```

---

# Admin

## Dashboard Statistics

```http
GET /api/admin/dashboard
```

## Get All Users

```http
GET /api/admin/users
```

## Get Single User

```http
GET /api/admin/users/:id
```

## Suspend User

```http
PATCH /api/admin/users/:id/suspend
```

## Activate User

```http
PATCH /api/admin/users/:id/activate
```

## Change User Role

```http
PATCH /api/admin/users/:id/role
```

## Get All Rentals

```http
GET /api/admin/rentals
```

## Get All Payments

```http
GET /api/admin/payments
```

## Delete Gear

```http
DELETE /api/admin/gears/:id
```

---

# 💳 Stripe Test Card

Use this card for testing payments:

```text
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVV: Any 3 digits
ZIP: Any valid ZIP code
```

---

# ✨ Features Implemented

- JWT Authentication
- Refresh Token System
- Role Based Authorization
- Customer Dashboard
- Provider Dashboard
- Category Management
- Gear Management
- Rental Management
- Stripe Payment Integration
- Stripe Webhook Handling
- Review System
- Admin Dashboard
- User Management
- Provider Order Management
- Search & Filtering
- Pagination
- Global Error Handling
- Secure Password Hashing
- Prisma ORM Integration
- PostgreSQL Database Integration

---

# 📬 Postman Testing

1. Import the Postman Collection from the `postman` folder.
2. Set Base URL:

```text
https://gearup-backend-b7a4.onrender.com
```

3. Login using Admin, Provider, or Customer credentials.
4. Copy Access Token.
5. Add:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

6. Test all protected endpoints.

---

# 👨‍💻 Author

**Md. Mesbahul Alam (Toha)**

---
⭐ If you found this project useful, please give it a star on GitHub.
