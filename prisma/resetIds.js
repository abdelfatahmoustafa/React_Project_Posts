const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function resetIds() {
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = 'User';`
  );
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = 'Post';`
  );
  await prisma.$executeRawUnsafe(
    `DELETE FROM sqlite_sequence WHERE name = 'Section';`
  );

  console.log("Auto-increment IDs reset for User, Post, and Section.");
}

resetIds()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
