// prisma/seed.ts
import { PrismaClient, MealType } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const MEAL_TYPES = Object.values(MealType); // [BREAKFAST, LUNCH, DINNER, SNACK]

const FOODS = [
  "Grilled chicken breast", "Brown rice", "Steamed broccoli", "Salmon fillet",
  "Greek yogurt", "Mixed berries", "Almonds", "Avocado toast", "Scrambled eggs",
  "Oatmeal", "Quinoa salad", "Turkey sandwich", "Protein shake", "Sweet potato",
  "Spinach salad", "Grilled shrimp", "Black beans", "Whole wheat pasta",
  "Cottage cheese", "Banana", "Peanut butter", "Roasted vegetables",
];

const NUM_MEALS = 200;

async function main() {
  console.log(`Seeding ${NUM_MEALS} meals...`);

  for (let i = 0; i < NUM_MEALS; i++) {
    const itemCount = faker.number.int({ min: 1, max: 4 });

    const items = Array.from({ length: itemCount }, () => {
      const calories = faker.number.int({ min: 80, max: 700 });
      return {
        food_name: faker.helpers.arrayElement(FOODS),
        quantity: faker.number.float({ min: 0.5, max: 3, fractionDigits: 1 }),
        calories,
        protein: faker.number.float({ min: 2, max: 50, fractionDigits: 1 }),
        carbs: faker.number.float({ min: 0, max: 80, fractionDigits: 1 }),
        fat: faker.number.float({ min: 0, max: 40, fractionDigits: 1 }),
      };
    });

    const totalCalories = items.reduce((sum, it) => sum + it.calories, 0);

    await prisma.meal.create({
      data: {
        meal_type: faker.helpers.arrayElement(MEAL_TYPES),
        date: faker.date.recent({ days: 90 }),
        total_calories: totalCalories,
        items: { create: items },
      },
    });

    if ((i + 1) % 25 === 0) console.log(`  ${i + 1}/${NUM_MEALS} meals created`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });