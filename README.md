# 🚀 GearUp Backend API

A production-ready RESTful backend API for **GearUp**, a Sports & Outdoor Equipment Rental Platform. The platform enables customers to rent equipment, providers to manage their inventory and rental orders, and administrators to manage the entire platform.

---

## 🌐 Live API

**Production Server:**
https://gearup-backend-b7a4.onrender.com

---

## 🎥 Demo Video

https://drive.google.com/drive/folders/1SB4AbuENTyAGG9thCvpzFmlHz8p043uW

---

## 📬 Postman Collection

[GearUp Backend Postman Collection](https://github.com/mesbahtoha/GearUp-Backend-B7A4/blob/main/postman/GearUp%20Backand%20Postman%20Collections.postman_collection.json)

---

## 📖 Project Overview

**GearUp** is a backend API designed for a sports and outdoor equipment rental platform.

Users can browse available equipment, rent products for a specific period, make secure online payments through Stripe, submit reviews, and manage their rental activities.

The system also provides dedicated functionality for **Providers** and **Administrators** to manage equipment, rentals, users, payments, categories, and platform statistics.

---

## ✨ Key Features

* 🔐 JWT Authentication with Access & Refresh Tokens
* 👥 Role-Based Authorization
* 🏕️ Sports & Outdoor Gear Management
* 📦 Rental & Order Management
* 💳 Stripe Payment Integration
* 🔔 Stripe Webhook Handling
* ⭐ Review & Rating System
* 📊 Customer & Provider Dashboards
* 🛠️ Admin Dashboard
* 👤 User Management
* 📂 Category Management
* 🔎 Search & Filtering
* 📄 Pagination
* 🔒 Secure Password Hashing
* ⚠️ Global Error Handling
* 🗄️ PostgreSQL Database with Prisma ORM
* 🚀 Production Deployment on Render

---

# 👥 User Roles

## 👑 Admin

Administrators have full control over the platform.

* Manage categories
* Manage users
* View dashboard statistics
* View all rentals
* View all payments
* Suspend users
* Activate users
* Change user roles
* Delete gears

## 🏪 Provider

Providers can manage their own equipment and rental orders.

* Create gears
* Update gears
* Delete gears
* View own gears
* View rental orders
* Confirm rental orders
* Mark pickup status
* Mark return status

## 🧑 Customer

Customers can browse, rent, pay for, and review equipment.

* Browse gears
* Search and filter gears
* Create rentals
* View rental history
* Make payments
* Create reviews
* Update reviews
* Delete reviews

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* NeonDB

### ORM

* Prisma ORM

### Authentication

* JWT
* Access Token
* Refresh Token
* bcryptjs

### Payment

* Stripe
* Stripe Webhooks

### Other Technologies

* CORS
* Cookie Parser
* dotenv
* HTTP Status Codes

---

# 📂 Project Structure

```text
gearup-backend/
│
├── src/
│   ├── config/
│   ├── lib/
│   ├── middlewares/
│   │
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

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/mesbahtoha/GearUp-Backend-B7A4.git

cd GearUp-Backend-B7A4
```

## 2. Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root:

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

> ⚠️ Never commit your `.env` file or secret keys to GitHub.

---

# 🗄️ Database Setup

After configuring your database, generate the Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate deploy
```

Seed the database:

```bash
npx prisma db seed
```

---

# ▶️ Running the Project

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

The development server will run on:

```text
http://localhost:5000
```

---

# 🔐 Authentication

Protected endpoints require a valid JWT access token.

Add the token to the request header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 👨‍💻 Admin Credentials

For testing the admin functionality:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

> ⚠️ These credentials are intended for development/testing purposes only.

---

# 📌 API Endpoints

## 🏠 Root

### Server Check

```http
GET /
```

---

## 🔐 Authentication

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| POST   | `/api/auth/login`           | Login                |
| POST   | `/api/auth/refresh-token`   | Refresh access token |
| POST   | `/api/auth/logout`          | Logout               |
| PATCH  | `/api/auth/change-password` | Change password      |

---

## 👤 Users

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/users/register`   | Register user            |
| GET    | `/api/users/me`         | Get current user profile |
| PUT    | `/api/users/my-profile` | Update profile           |

---

## 📂 Categories

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/categories`     | Create category     |
| GET    | `/api/categories`     | Get all categories  |
| GET    | `/api/categories/:id` | Get single category |
| PATCH  | `/api/categories/:id` | Update category     |
| DELETE | `/api/categories/:id` | Delete category     |

---

## 🏕️ Gears

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `/api/gears`          | Create gear          |
| GET    | `/api/gears`          | Get all gears        |
| GET    | `/api/gears/:id`      | Get single gear      |
| GET    | `/api/gears/my-gears` | Get provider's gears |
| PATCH  | `/api/gears/:id`      | Update gear          |
| DELETE | `/api/gears/:id`      | Delete gear          |

---

## 📦 Rentals

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| POST   | `/api/rentals`                 | Create rental          |
| GET    | `/api/rentals/my-rentals`      | Get customer's rentals |
| GET    | `/api/rentals/provider-orders` | Get provider orders    |
| GET    | `/api/rentals/:id`             | Get single rental      |
| GET    | `/api/rentals/all`             | Get all rentals        |
| PATCH  | `/api/rentals/:id/confirm`     | Confirm order          |
| PATCH  | `/api/rentals/:id/pickup`      | Mark pickup            |
| PATCH  | `/api/rentals/:id/return`      | Mark return            |
| PATCH  | `/api/rentals/:id/cancel`      | Cancel rental          |

---

## 💳 Payments

### Create Stripe Checkout Session

```http
POST /api/payments/checkout/:rentalId
```

### Stripe Webhook

```http
POST /api/webhooks/stripe
```

---

## ⭐ Reviews

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| POST   | `/api/reviews`              | Create review      |
| GET    | `/api/reviews/my-reviews`   | Get user's reviews |
| GET    | `/api/reviews/all`          | Get all reviews    |
| GET    | `/api/reviews/gear/:gearId` | Get gear reviews   |
| PATCH  | `/api/reviews/:id`          | Update review      |
| DELETE | `/api/reviews/:id`          | Delete review      |

---

## 📊 Dashboard

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/api/dashboard/provider` | Provider dashboard |
| GET    | `/api/dashboard/customer` | Customer dashboard |

---

## 👑 Admin

| Method | Endpoint                        | Description          |
| ------ | ------------------------------- | -------------------- |
| GET    | `/api/admin/dashboard`          | Dashboard statistics |
| GET    | `/api/admin/users`              | Get all users        |
| GET    | `/api/admin/users/:id`          | Get single user      |
| PATCH  | `/api/admin/users/:id/suspend`  | Suspend user         |
| PATCH  | `/api/admin/users/:id/activate` | Activate user        |
| PATCH  | `/api/admin/users/:id/role`     | Change user role     |
| GET    | `/api/admin/rentals`            | Get all rentals      |
| GET    | `/api/admin/payments`           | Get all payments     |
| DELETE | `/api/admin/gears/:id`          | Delete gear          |

---

# 💳 Stripe Test Payment

Use the following Stripe test card:

```text
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVV: Any 3 digits
ZIP: Any valid ZIP code
```

> Use Stripe test mode credentials when testing payments locally.

---

# 🔔 Stripe Webhook

For local webhook testing with Stripe CLI:

```bash
stripe listen --forward-to localhost:5000/api/webhooks/stripe
```

Stripe CLI will provide a webhook signing secret. Add it to your `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

---

# 📬 Postman API Testing

You can test the complete API using the provided Postman collection.

### Steps

**1. Import the collection**

Import:

```text
postman/GearUp Backand Postman Collections.postman_collection.json
```

**2. Set the Base URL**

```text
https://gearup-backend-b7a4.onrender.com
```

**3. Login**

Login using an Admin, Provider, or Customer account.

**4. Get the Access Token**

Copy the generated access token.

**5. Add Authorization**

For protected routes:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**6. Test the API**

You can now test the available endpoints based on the user's role.

---

# 🛡️ Security

GearUp implements several security mechanisms:

* JWT-based authentication
* Access & refresh token system
* Role-based authorization
* Password hashing with bcrypt
* Environment-based secret management
* Protected API routes
* Stripe webhook signature verification
* Global error handling
* Server-side validation

---

# 🚀 Deployment

The production API is deployed on **Render** and uses **NeonDB PostgreSQL** as the database.

### Production API

```text
https://gearup-backend-b7a4.onrender.com
```

---

# 📈 Future Improvements

Potential future improvements include:

* Email notifications
* Advanced analytics
* Equipment availability calendar
* Automated rental reminders
* Provider earnings reports
* Image upload and optimization
* Advanced admin analytics
* Automated review moderation

---

# 👨‍💻 Author

### Md. Mesbahul Alam (Toha)

**Full Stack Developer**

* GitHub: https://github.com/mesbahtoha
* LinkedIn: https://linkedin.com/in/mesbahul-alam

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Built with Node.js, Express, TypeScript, Prisma, PostgreSQL & Stripe.**
