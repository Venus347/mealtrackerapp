// prisma/seed.ts
import { PrismaClient} from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

const userIds = Array.from({ length: 10}, () => faker.string.uuid());
//const mealIds = Array.from({ length: 10}, () => faker.string.uuid());
//const timestamps = Array.from({ length: 10}, () => faker.date.between({from: '1965-01-01', to: Date.now()}));
const protein = Array.from({ length: 10}, () => faker.number.float({min:0, max:100}));
const carbs = Array.from({ length: 10}, () => faker.number.float({min:0, max:100}));
const sugar = Array.from({ length: 10}, () => faker.number.float({min:0, max:100}));
const fat = Array.from({ length: 10}, () => faker.number.float({min:0, max:100}));
const energyKCal = Array.from({ length: 10}, () => faker.number.float({min:0, max:100}));
const portion = () => {
  const size = ['small','medium','large'];
  const rand = Math.floor(Math.random()*3);
  return size[rand];
}

async function main() {
  //first test insert 
  const alice = await prisma.user.upsert({
    where: { username: "gg"},
    update: {},
    create: {
      username: "gg",
      firstName: "alice",
      lastName: "bob"
    }
  })

  for (const userId of userIds) {
    const user = await prisma.user.create({
        data: {
          uuid: userId,
          username: 'jacoblover' + faker.string.alpha(2),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        }
    })
    
    for (let i = 0; i < 10; i++){
      const meal = await prisma.meal.create({
      data: {
        mealId: faker.string.uuid(),
        uuid: user.uuid,
        timestamp: faker.date.between({from: '1965-01-01', to: Date.now()})
      }
    })
      for (let i = 0; i < 10; i++){
         const mealItem = await prisma.mealItem.create({
         data: {
           mealId: meal.mealId,
           protein: faker.number.float({min:0, max:100}),
           carbs: faker.number.float({min:0, max:100}),
           sugar: faker.number.float({min:0, max:100}),
           fat: faker.number.float({min:0, max:100}),
           energyKcal: faker.number.float({min:0, max:1000}),
           portion: portion()
      }
    })
      }
    }

}}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });