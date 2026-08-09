import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const PORT = config.port || 5000;

async function main() {
    try {
        // prisma connections check
        await prisma.$connect();
        console.log("Connected to the databases successfully!");

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        const shutdown = async (signal: string) => {
            console.log(`${signal} received. Shutting down gracefully...`);
            server.close(async () => {
                await prisma.$disconnect();
                console.log("Server closed");
                process.exit(0);
            });
            setTimeout(() => {
                console.error("Forced shutdown after timeout");
                process.exit(1);
            }, 10000).unref();
        };

        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
        console.error("Error starting the server: ", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
