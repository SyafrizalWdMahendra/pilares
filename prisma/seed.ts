import { bookings, courts, users } from "@/src/lib/data";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Start seeding...");

  await prisma.booking.deleteMany();
  await prisma.court.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Old data cleaned.");

  const usersWithHashedPasswords = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  );

  const result = await prisma.$transaction(async (tx) => {
    const usersResult = await tx.user.createMany({
      data: usersWithHashedPasswords,
    });

    await tx.court.createMany({
      data: courts,
    });

    const createdCourts = await tx.court.findMany({
      select: { id: true },
      orderBy: { id: "asc" },
    });

    const bookingsWithCourtId = bookings.map((booking, index) => ({
      ...booking,
      courtId: createdCourts[index % createdCourts.length].id,
    }));

    const bookingResult = await tx.booking.createMany({
      data: bookingsWithCourtId,
    });

    return {
      users: usersResult.count,
      courts: createdCourts.length,
      bookings: bookingResult.count,
    };
  });

  console.log(`✅ Created ${result.users} users.`);
  console.log(`✅ Created ${result.courts} courts.`);
  console.log(`✅ Created ${result.bookings} books.`);
  console.log("🌱 Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
