import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role } from "../generated/prisma/enums";
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({
    connectionString,
});
const prisma = new PrismaClient({
    adapter,
});
async function main() {
    const existingAdmin = await prisma.user.findUnique({
        where: {
            email: "admin@gearup.com",
        },
    });
    if (existingAdmin) {
        console.log("ℹ️ Admin already exists");
        return;
    }
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
        data: {
            name: "System Admin",
            email: "admin@gearup.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });
    console.log("✅ Admin created successfully");
}
main()
    .catch((error) => {
    console.error("❌ Seed Error:", error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map