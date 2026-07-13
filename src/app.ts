import cookieParser from "cookie-parser";
import express, {
  Application,
  Request,
  Response,
} from "express";
import cors from "cors";

import config from "./config";

import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";

import { categoryRoutes } from "./modules/category/category.routes";
import { gearRoutes } from "./modules/gear/gear.routes";
import { rentalRoutes } from "./modules/rental/rental.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";

import paymentWebhookRoute from "./modules/payment/payment.webhook.route";

import { globalErrorHandler } from "./middlewares/errorHandler";
import { reviewRoutes } from "./modules/review/review.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Stripe Webhook
|--------------------------------------------------------------------------
*/

app.use(
  "/api/webhooks",
  paymentWebhookRoute
);

/*
|--------------------------------------------------------------------------
| Parsers
|--------------------------------------------------------------------------
*/

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Root Route
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  async (
    req: Request,
    res: Response
  ) => {
    res.send(
      "Welcome to GearUp Backend!"
    );
  }
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/gears",
  gearRoutes
);

app.use(
  "/api/rentals",
  rentalRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/*
|--------------------------------------------------------------------------
| 404 Route
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route Not Found",
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(globalErrorHandler);

export default app;