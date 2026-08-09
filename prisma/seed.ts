import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { Role, RentalStatus, PaymentStatus } from "../generated/prisma/enums";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const SALT_ROUNDS = 10;

const DEMO_USERS = [
  {
    email: "admin@gearup.com",
    password: "admin123",
    name: "System Admin",
    role: Role.ADMIN,
    phone: "01700000001",
  },
  {
    email: "provider@gearup.com",
    password: "provider123",
    name: "Alex Provider",
    role: Role.PROVIDER,
    phone: "01700000002",
  },
  {
    email: "customer@gearup.com",
    password: "customer123",
    name: "Sam Customer",
    role: Role.CUSTOMER,
    phone: "01700000003",
  },
];

const CATEGORIES = [
  { name: "Camping & Hiking", description: "Tents, sleeping bags, backpacks and hiking essentials" },
  { name: "Cycling", description: "Mountain bikes, road bikes and cycling accessories" },
  { name: "Water Sports", description: "Kayaks, paddleboards, wetsuits and snorkeling gear" },
  { name: "Racket Sports", description: "Tennis, badminton and squash rackets & equipment" },
  { name: "Team Sports", description: "Football, basketball, cricket and volleyball equipment" },
  { name: "Winter Sports", description: "Skis, snowboards and winter protection gear" },
];

const GEARS = [
  {
    name: "4-Person Camping Tent",
    brand: "Coleman",
    description: "Spacious weatherproof tent with easy setup, perfect for family camping trips.",
    pricePerDay: 15,
    stock: 20,
    category: "Camping & Hiking",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
  },
  {
    name: "Hiking Backpack 60L",
    brand: "Osprey",
    description: "Comfortable 60-liter backpack with ergonomic suspension for multi-day treks.",
    pricePerDay: 8,
    stock: 30,
    category: "Camping & Hiking",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    name: "Mountain Bike - Hardtail",
    brand: "Trek",
    description: "Reliable hardtail mountain bike with hydraulic disc brakes and 27.5 wheels.",
    pricePerDay: 25,
    stock: 12,
    category: "Cycling",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80",
  },
  {
    name: "Road Bike Carbon",
    brand: "Giant",
    description: "Lightweight carbon road bike built for speed and long-distance rides.",
    pricePerDay: 35,
    stock: 8,
    category: "Cycling",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80",
  },
  {
    name: "Inflatable Kayak 2-Seater",
    brand: "Intex",
    description: "Durable inflatable kayak for two with paddles and pump included.",
    pricePerDay: 30,
    stock: 10,
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80",
  },
  {
    name: "Stand-Up Paddleboard",
    brand: "Bic",
    description: "All-round inflatable paddleboard with adjustable paddle and carry bag.",
    pricePerDay: 22,
    stock: 15,
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
  },
  {
    name: "Pro Tennis Racket",
    brand: "Wilson",
    description: "Tournament-grade tennis racket with 100in head size and balanced weight.",
    pricePerDay: 10,
    stock: 25,
    category: "Racket Sports",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80",
  },
  {
    name: "Badminton Racket Set",
    brand: "Yonex",
    description: "Carbon graphite badminton rackets ideal for casual and competitive play.",
    pricePerDay: 6,
    stock: 40,
    category: "Racket Sports",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
  },
  {
    name: "Football - Size 5",
    brand: "Adidas",
    description: "Match-quality football with durable synthetic cover and excellent grip.",
    pricePerDay: 5,
    stock: 50,
    category: "Team Sports",
    image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80",
  },
  {
    name: "Basketball - Indoor",
    brand: "Spalding",
    description: "Official-size indoor basketball with superior bounce and grip.",
    pricePerDay: 5,
    stock: 45,
    category: "Team Sports",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
  },
  {
    name: "Snowboard - All Mountain",
    brand: "Burton",
    description: "Versatile all-mountain snowboard with bindings, ready for the slopes.",
    pricePerDay: 40,
    stock: 6,
    category: "Winter Sports",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
  },
  {
    name: "Downhill Ski Set",
    brand: "Rossignol",
    description: "Complete downhill ski set with boots and poles for intermediate riders.",
    pricePerDay: 45,
    stock: 5,
    category: "Winter Sports",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
  },
];

async function main() {
  console.log("🌱 Seeding GearUp database...");

  // 1. Demo users
  const userIds: Record<string, string> = {};
  for (const demo of DEMO_USERS) {
    const existing = await prisma.user.findUnique({ where: { email: demo.email } });
    if (existing) {
      userIds[demo.role] = existing.id;
      console.log(`ℹ️ User exists: ${demo.email}`);
      continue;
    }
    const hashedPassword = await bcrypt.hash(demo.password, SALT_ROUNDS);
    const user = await prisma.user.create({
      data: {
        name: demo.name,
        email: demo.email,
        phone: demo.phone,
        password: hashedPassword,
        role: demo.role,
      },
    });
    userIds[demo.role] = user.id;
    console.log(`✅ Created user: ${demo.email} (${demo.role})`);
  }

  // 2. Categories
  const categoryIds: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    let category = await prisma.category.findUnique({ where: { name: cat.name } });
    if (!category) {
      category = await prisma.category.create({
        data: { name: cat.name, description: cat.description },
      });
      console.log(`✅ Created category: ${cat.name}`);
    }
    categoryIds[cat.name] = category.id;
  }

  // 3. Gear items (assigned to demo provider)
  const providerId = userIds[Role.PROVIDER];
  const gearIds: string[] = [];
  for (const gear of GEARS) {
    const categoryId = categoryIds[gear.category];
    const existing = await prisma.gearItem.findFirst({
      where: { name: gear.name, providerId },
    });
    if (existing) {
      gearIds.push(existing.id);
      continue;
    }
    const created = await prisma.gearItem.create({
      data: {
        name: gear.name,
        brand: gear.brand,
        description: gear.description,
        image: gear.image,
        pricePerDay: gear.pricePerDay,
        stock: gear.stock,
        categoryId,
        providerId,
      },
    });
    gearIds.push(created.id);
    console.log(`✅ Created gear: ${gear.name}`);
  }

  // 4. Sample rentals (only if none exist for the demo customer)
  const customerId = userIds[Role.CUSTOMER];
  const existingRentals = await prisma.rentalOrder.count({ where: { customerId } });
  if (existingRentals === 0 && gearIds.length >= 3) {
    const today = new Date();
    const daysFromNow = (days: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + days);
      return d.toISOString().slice(0, 10);
    };

    const rentalSpecs = [
      {
        gearId: gearIds[0],
        status: RentalStatus.RETURNED,
        start: -30,
        end: -27,
        quantity: 1,
        paid: true,
      },
      {
        gearId: gearIds[2],
        status: RentalStatus.RETURNED,
        start: -21,
        end: -18,
        quantity: 2,
        paid: true,
      },
      {
        gearId: gearIds[4],
        status: RentalStatus.PLACED,
        start: 2,
        end: 5,
        quantity: 1,
        paid: false,
      },
      {
        gearId: gearIds[6],
        status: RentalStatus.CONFIRMED,
        start: 3,
        end: 6,
        quantity: 1,
        paid: false,
      },
      {
        gearId: gearIds[8],
        status: RentalStatus.PAID,
        start: 1,
        end: 4,
        quantity: 1,
        paid: true,
      },
    ];

    for (const spec of rentalSpecs) {
      const startDate = new Date(daysFromNow(spec.start));
      const endDate = new Date(daysFromNow(spec.end));
      const gear = await prisma.gearItem.findUnique({ where: { id: spec.gearId } });
      if (!gear) continue;
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = gear.pricePerDay * spec.quantity * days;

      const rental = await prisma.rentalOrder.create({
        data: {
          quantity: spec.quantity,
          startDate,
          endDate,
          totalPrice,
          status: spec.status,
          customerId,
          gearId: spec.gearId,
          payment: spec.paid
            ? {
                create: {
                  amount: totalPrice,
                  provider: "STRIPE",
                  status: PaymentStatus.COMPLETED,
                  transactionId: `ch_demo_${cryptoRandom(12)}`,
                  paidAt: startDate,
                },
              }
            : undefined,
        },
      });
      console.log(`✅ Created rental: ${spec.status} - ${gear.name}`);
    }
  } else {
    console.log("ℹ️ Rentals already seeded, skipping");
  }

  // 5. Sample reviews (only if none exist)
  const existingReviews = await prisma.review.count({ where: { customerId } });
  if (existingReviews === 0 && gearIds.length >= 3) {
    const reviews = [
      { gearId: gearIds[0], rating: 5, comment: "Excellent tent! Easy to set up and stayed dry through heavy rain." },
      { gearId: gearIds[2], rating: 4, comment: "Great bike, smooth gears and comfortable on trails." },
      { gearId: gearIds[4], rating: 5, comment: "The kayak was amazing! Perfect for a weekend lake trip." },
      { gearId: gearIds[8], rating: 4, comment: "Quality ball, perfect grip. Would rent again." },
    ];

    for (const review of reviews) {
      await prisma.review.create({
        data: {
          rating: review.rating,
          comment: review.comment,
          customerId,
          gearId: review.gearId,
        },
      });
      console.log(`✅ Created review (${review.rating}/5) for gear ${review.gearId.slice(0, 8)}`);
    }
  } else {
    console.log("ℹ️ Reviews already seeded, skipping");
  }

  console.log("🎉 Seeding complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔑 Demo Credentials");
  console.log("  Admin    → admin@gearup.com    / admin123");
  console.log("  Provider → provider@gearup.com / provider123");
  console.log("  Customer → customer@gearup.com / customer123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

function cryptoRandom(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

main()
  .catch((error) => {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
