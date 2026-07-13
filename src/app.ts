import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { categoryRoutes } from "./modules/category/category.routes";
import { gearRoutes } from "./modules/gear/gear.routes";
import { rentalRoutes } from "./modules/rental/rental.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";

const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    

app.get("/", async (req: Request, res: Response) => {
    res.send("Welcome to the GearUp Backend!");
} )

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use("/api/gears", gearRoutes);
app.use("/api/rentals", rentalRoutes);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route Not Found",
  });
});

app.use(globalErrorHandler);

export default app;