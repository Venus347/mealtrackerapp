// prisma/seed.ts
import { PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(2));
}

async function main() {
  console.log('Seeding dummy data...');

  const USER_COUNT = 5;
  const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'] as const;

  for (let i = 0; i < USER_COUNT; i++) {
    const gender = faker.helpers.arrayElement(['MALE', 'FEMALE']);
    const firstName = faker.person.firstName(gender === 'MALE' ? 'male' : 'female');
    const lastName = faker.person.lastName();
    const height = faker.number.int({ min: 155, max: 190 });
    const baseWeight = faker.number.float({ min: 55, max: 95, fractionDigits: 1 });

    const bmiRecordsData = Array.from({ length: 5 }).map((_, index) => {
      const recordedWeight = Number((baseWeight + faker.number.float({ min: -2, max: 2, fractionDigits: 1 })).toFixed(1));
      return {
        height,
        weight: recordedWeight,
        bmi: calculateBMI(recordedWeight, height),
        recordedAt: faker.date.recent({ days: 30 * (index + 1) }),
      };
    });

    const mealsData = Array.from({ length: 12 }).map(() => ({
      name: faker.food.dish(),
      mealType: faker.helpers.arrayElement(mealTypes),
      calories: faker.number.int({ min: 200, max: 800 }),
      protein: faker.number.int({ min: 10, max: 45 }),
      carbs: faker.number.int({ min: 20, max: 80 }),
      fat: faker.number.int({ min: 5, max: 30 }),
      date: faker.date.recent({ days: 10 }),
    }));

    await prisma.user.create({
      data: {
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        name: `${firstName} ${lastName}`,
        gender,
        birthDate: faker.date.birthdate({ min: 20, max: 50, mode: 'age' }),
        height,
        weight: baseWeight,
        bmiRecords: { create: bmiRecordsData },
        meals: { create: mealsData },
      },
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
