# 🚀 GearUp Backend API

GearUp is a backend API for a Sports & Outdoor Equipment Rental Platform where customers can rent equipment, providers can manage inventory, and administrators can oversee the entire platform.

---

<<<<<<< HEAD
## 🌐 Live API
=======
# 🌐 Live API
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

Production Server:

https://gearup-backend-b7a4.onrender.com

---

<<<<<<< HEAD
## 🎯 Project Overview
=======
# 🎥 Demo Video

https://drive.google.com/drive/folders/1SB4AbuENTyAGG9thCvpzFmlHz8p043uW

---

# 📬 Postman Collection

Postman Collection:

https://github.com/mesbahtoha/GearUp-Backend-B7A4/blob/main/postman/GearUp%20Backand%20Postman%20Collections.postman_collection.json

---

# 🎯 Project Overview
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

GearUp allows users to:

- Browse sports and outdoor equipment
- Rent equipment for a specific period
- Make secure online payments using Stripe
- Leave reviews after completing rentals
- Manage equipment inventory
- Track rental orders
- Manage users and platform activities through an Admin Panel

---

<<<<<<< HEAD
## 👥 User Roles

### Admin
- Manage categories
- Manage users
- View platform analytics
- Manage rentals
- Manage payments
- Suspend or activate users
- Delete gears

### Provider
- Create gears
- Update gears
- Manage inventory
- View rental orders
- Confirm rentals
- Mark pickups and returns

### Customer
- Browse gears
- Create rentals
- Make payments
- View rental history
- Submit reviews
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

---

# 🛠️ Tech Stack

<<<<<<< HEAD
### Backend
=======
## Backend

>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
- Node.js
- Express.js
- TypeScript

<<<<<<< HEAD
### Database
- PostgreSQL (NeonDB)

### ORM
- Prisma ORM

### Authentication
- JWT (Access Token & Refresh Token)

### Payment Gateway
- Stripe

### Other Packages
- bcryptjs
- cookie-parser
- cors
- dotenv
- http-status
- jsonwebtoken
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

---

# 📂 Project Structure

```bash
<<<<<<< HEAD
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
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
```

---

# ⚙️ Installation

## Clone Repository

```bash
<<<<<<< HEAD
git clone <repository-url>
cd gearup-backend
=======
git clone https://github.com/mesbahtoha/GearUp-Backend-B7A4.git

cd GearUp-Backend-B7A4
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
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

<<<<<<< HEAD
Generate Prisma Client:
=======
Generate Prisma Client
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```bash
npx prisma generate
```

<<<<<<< HEAD
Run Migration:
=======
Run Migration
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```bash
npx prisma migrate deploy
```

<<<<<<< HEAD
Seed Database:

```bash
npm run prisma db seed
=======
Seed Database

```bash
npx prisma db seed
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
```

---

# ▶️ Run Project

<<<<<<< HEAD
Development:
=======
Development
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```bash
npm run dev
```

<<<<<<< HEAD
Build:
=======
Build
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```bash
npm run build
```

<<<<<<< HEAD
Production:
=======
Production
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```bash
npm start
```

---

# 🔐 Authentication

<<<<<<< HEAD
The API uses JWT Authentication.

Protected Routes require:
=======
Protected routes require:
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

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

<<<<<<< HEAD
## Authentication

### Login
=======
# Root

### Server Check

```http
GET /
```

---

# Authentication

## Login
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/auth/login
```

<<<<<<< HEAD
### Refresh Token
=======
## Refresh Token
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/auth/refresh-token
```

<<<<<<< HEAD
### Change Password

```http
POST /api/auth/change-password
=======
## Logout

```http
POST /api/auth/logout
```

## Change Password

```http
PATCH /api/auth/change-password
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
```

---

<<<<<<< HEAD
## Users

### Register User
=======
# Users

## Register User
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/users/register
```

<<<<<<< HEAD
### Get Profile

```http
GET /api/users/profile
```

### Update Profile

```http
PATCH /api/users/profile
=======
## My Profile

```http
GET /api/users/me
```

## Update Profile

```http
PUT /api/users/my-profile
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
```

---

<<<<<<< HEAD
## Categories

### Create Category
=======
# Categories

## Create Category
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/categories
```

<<<<<<< HEAD
### Get Categories
=======
## Get All Categories
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/categories
```

<<<<<<< HEAD
### Update Category
=======
## Get Single Category

```http
GET /api/categories/:id
```

## Update Category
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
PATCH /api/categories/:id
```

<<<<<<< HEAD
### Delete Category
=======
## Delete Category
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
DELETE /api/categories/:id
```

---

<<<<<<< HEAD
## Gears

### Create Gear
=======
# Gears

## Create Gear
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/gears
```

<<<<<<< HEAD
### Get All Gears
=======
## Get All Gears
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/gears
```

<<<<<<< HEAD
### Get Single Gear
=======
## Get Single Gear
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/gears/:id
```

<<<<<<< HEAD
### Update Gear

```http
PATCH /api/gears/:id
```

### Delete Gear

```http
DELETE /api/gears/:id
```

### Provider Gears
=======
## Get My Gears
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/gears/my-gears
```

<<<<<<< HEAD
---

## Rentals

### Create Rental
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/rentals
```

<<<<<<< HEAD
### Customer Rentals
=======
## My Rentals
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/rentals/my-rentals
```

<<<<<<< HEAD
### Provider Orders
=======
## Provider Orders
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/rentals/provider-orders
```

<<<<<<< HEAD
### Confirm Rental
=======
## Get Single Rental

```http
GET /api/rentals/:id
```

## Get All Rentals (Admin)

```http
GET /api/rentals/all
```

## Confirm Order
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
PATCH /api/rentals/:id/confirm
```

<<<<<<< HEAD
### Pickup Rental
=======
## Pickup Order
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
PATCH /api/rentals/:id/pickup
```

<<<<<<< HEAD
### Return Rental
=======
## Return Order
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
PATCH /api/rentals/:id/return
```

<<<<<<< HEAD
---

## Payments

### Create Checkout Session
=======
## Cancel Order

```http
PATCH /api/rentals/:id/cancel
```

---

# Payments

## Create Checkout Session
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/payments/checkout/:rentalId
```

<<<<<<< HEAD
### Stripe Webhook
=======
## Stripe Webhook
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/webhooks/stripe
```

---

<<<<<<< HEAD
## Reviews

### Create Review
=======
# Reviews

## Create Review
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
POST /api/reviews
```

<<<<<<< HEAD
### My Reviews
=======
## My Reviews
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/reviews/my-reviews
```

<<<<<<< HEAD
### Gear Reviews
=======
## Get All Reviews

```http
GET /api/reviews/all
```

## Gear Reviews
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/reviews/gear/:gearId
```

<<<<<<< HEAD
---

## Admin

### Dashboard
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/admin/dashboard
```

<<<<<<< HEAD
### Users
=======
## Get All Users
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
GET /api/admin/users
```

<<<<<<< HEAD
### Rentals

```http
GET /api/admin/rentals
```

### Payments

```http
GET /api/admin/payments
```

### Suspend User
=======
## Get Single User

```http
GET /api/admin/users/:id
```

## Suspend User
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
PATCH /api/admin/users/:id/suspend
```

<<<<<<< HEAD
### Activate User
=======
## Activate User
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
PATCH /api/admin/users/:id/activate
```

<<<<<<< HEAD
### Delete Gear
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

```http
DELETE /api/admin/gears/:id
```

---

# 💳 Stripe Test Card

<<<<<<< HEAD
Use the following test card while testing Stripe payments:

```text
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
ZIP: Any valid ZIP
=======
Use this card for testing payments:

```text
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVV: Any 3 digits
ZIP: Any valid ZIP code
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
```

---

<<<<<<< HEAD
# 📬 Postman Collection

The complete Postman Collection is included with this project submission.

Import the collection and environment file into Postman to test all endpoints.

---

# ✨ Features Implemented

- JWT Authentication
- Role-Based Authorization
=======
# ✨ Features Implemented

- JWT Authentication
- Refresh Token System
- Role Based Authorization
- Customer Dashboard
- Provider Dashboard
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
- Category Management
- Gear Management
- Rental Management
- Stripe Payment Integration
- Stripe Webhook Handling
- Review System
- Admin Dashboard
- User Management
- Provider Order Management
<<<<<<< HEAD
- Pagination
- Search & Filtering
- Global Error Handling
- Secure Password Hashing
- Prisma ORM Integration
=======
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

---

# 👨‍💻 Author

<<<<<<< HEAD
**Md. Mesbahul Alam**

---
=======
**Md. Mesbahul Alam (Toha)**

---
⭐ If you found this project useful, please give it a star on GitHub.
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
