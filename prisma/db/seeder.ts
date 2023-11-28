const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedItems() {
  const itemData = [
    { name: "Pasta", message: "Needed for spaghetti dinner." },
    { name: "Eggs", message: "Morning breakfast." },
    { name: "Cheese", message: "Need this for Lasagna dinner tonight." },
    { name: "Bacon", message: "Perfect with eggs in the morning." },
    { name: "Sausage", message: "Alternative to bacon for breakfast." },
    { name: "Milk", message: "Lunchtime cereal or light mid-day snack." },
    { name: "Salmon", message: "Great protien lunch item." },
  ];

  for (const item of itemData) {
    await prisma.item.create({
      data: item,
    });
  }
  console.log("Seed data created successfully.");
}

async function main() {
  await seedItems();
}

main()
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
