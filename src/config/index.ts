import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
port: process.env.PORT || 5000,
<<<<<<< HEAD
database_url: process.env.DATABASE_URL,
app_url: process.env.APP_URL || "http://localhost:3000",
=======
database_url: process.env.DATABASE_URL,app_url: process.env.APP_URL,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
jwt_acess_secret: process.env.JWT_ACCESS_SECRET!,
jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
stripe_secret_key:process.env.STRIPE_SECRET_KEY!,
stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY!,
stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET!,
<<<<<<< HEAD
client_url: process.env.CLIENT_URL || process.env.APP_URL || "http://localhost:3000",
=======
client_url: process.env.CLIENT_URL!,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
}