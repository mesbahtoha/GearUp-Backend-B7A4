# GearUp Backend API

GearUp is a backend API for a Sports & Outdoor Equipment Rental Platform where customers can rent equipment, providers can manage inventory, and administrators can oversee the entire platform.

---

## Live API

Production Server:

https://gearup-backend-b7a4.onrender.com

Health Check: `GET /api/health`

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Customer** | toha@gmail.com | toha123 |
| **Provider** | provider@gmail.com | provider123 |
| **Admin** | admin@gmail.com | admin123 |

---

## Project Overview

GearUp allows users to:

- Browse sports and outdoor equipment
- Rent equipment for a specific period
- Make secure online payments using Stripe
- Leave reviews after completing rentals
- Manage equipment inventory
- Track rental orders
- Manage users and platform activities through an Admin Panel
- Sign in with **Google OAuth**

---

## User Roles

### Admin
- Manage categories
- Manage users (suspend/activate, change roles)
- View platform statistics & **analytics** (monthly revenue, rentals per month, rentals by status, gear by category)
- Manage rentals
- Manage payments
- Delete gears

### Provider
- Create gears
- Update gears
- Manage inventory
- View rental orders
- Confirm rentals
- Mark pickups and returns
- Cancel orders

### Customer
- Browse gears
- Create rentals
- Make payments
- View rental history
- Cancel orders
- Submit reviews

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL (NeonDB)

### ORM
- Prisma ORM

### Authentication
- JWT (Access Token & Refresh Token)
- Google OAuth 2.0

### Validation
- Zod (request validation middleware)

### Payment Gateway
- Stripe

### Other Packages
- bcryptjs
- cookie-parser
- cors
- dotenv
- http-status
- jsonwebtoken
- multer

---

## Project Structure

```bash
src/
├── config/            # Env config (JWT, Google OAuth, Stripe keys)
├── lib/               # Prisma client
├── middlewares/       # Auth, role guards, error handler, validate, upload
├── modules/
│   ├── auth/          # Login, register, refresh token, change password, Google OAuth
│   ├── user/          # Profile management
│   ├── category/      # Category CRUD
│   ├── gear/          # Gear CRUD, image upload
│   ├── rental/        # Rental lifecycle (confirm, pickup, return, cancel)
│   ├── payment/       # Stripe checkout & webhook
│   ├── review/        # Reviews
│   ├── admin/         # Dashboard, analytics, user/gear/category management
│   └── dashboard/     # Role-based dashboard stats
├── utils/
├── validations/       # Zod schemas (auth, gear, rental, review, category)
├── app.ts
└── server.ts          # Entry with graceful shutdown
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd gearup-backend
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

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

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

---

## Database Setup

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

## Run Project

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

---

## Authentication

The API uses JWT Authentication.

Protected Routes require:

```http
Authorization: Bearer ACCESS_TOKEN
```

### Google OAuth

```http
GET /api/auth/google
GET /api/auth/google/callback
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/auth/refresh-token` | Refresh access token |
| POST | `/api/auth/change-password` | Change password |
| GET | `/api/auth/google` | Start Google OAuth flow |
| GET | `/api/auth/google/callback` | Google OAuth callback |
| GET | `/api/health` | Health check |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register user |
| GET | `/api/users/profile` | Get profile |
| PATCH | `/api/users/profile` | Update profile |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/categories` | Create category (admin) |
| GET | `/api/categories` | Get categories |
| PATCH | `/api/categories/:id` | Update category (admin) |
| DELETE | `/api/categories/:id` | Delete category (admin) |

### Gears

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/gears` | Create gear (provider) |
| GET | `/api/gears` | Get all gears |
| GET | `/api/gears/:id` | Get single gear |
| PATCH | `/api/gears/:id` | Update gear (provider) |
| DELETE | `/api/gears/:id` | Delete gear |
| GET | `/api/gears/my-gears` | Provider gears |
| POST | `/api/gears/upload` | Upload gear image (auth, 2MB limit) |

### Rentals

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rentals` | Create rental |
| GET | `/api/rentals/my-rentals` | Customer rentals |
| GET | `/api/rentals/provider-orders` | Provider orders |
| GET | `/api/rentals/:id` | Get single rental (owner/provider/admin only) |
| PATCH | `/api/rentals/:id/confirm` | Confirm rental (provider) |
| PATCH | `/api/rentals/:id/pickup` | Mark picked up (provider) |
| PATCH | `/api/rentals/:id/return` | Mark returned (provider) |
| PATCH | `/api/rentals/:id/cancel` | Cancel rental (customer/provider/admin) |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/checkout/:rentalId` | Create Stripe checkout session |
| POST | `/api/webhooks/stripe` | Stripe webhook |

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews/my-reviews` | My reviews |
| GET | `/api/reviews/gear/:gearId` | Gear reviews |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Platform dashboard stats |
| GET | `/api/admin/analytics` | Charts data (revenue, rentals, statuses, categories) |
| GET | `/api/admin/users` | List users |
| GET | `/api/admin/rentals` | List rentals |
| GET | `/api/admin/payments` | List payments |
| PATCH | `/api/admin/users/:id/suspend` | Suspend user |
| PATCH | `/api/admin/users/:id/activate` | Activate user |
| DELETE | `/api/admin/gears/:id` | Delete gear |

---

## Stripe Test Card

Use the following test card while testing Stripe payments:

```text
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
ZIP: Any valid ZIP
```

---

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errorSources": []
}
```

Prisma errors are mapped to proper HTTP status codes (404 for not found, 409 for duplicates, 400 for constraint violations).

---

## Postman Collection

The complete Postman Collection is included with this project submission.

Postman collections: https://github.com/mesbahtoha/GearUp-Backend-B7A4/blob/main/postman/GearUp%20Backand%20Postman%20Collections.postman_collection.json

---

## Author

**Md. Mesbahul Alam**
