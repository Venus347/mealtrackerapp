import dotenv from "dotenv";
dotenv.config({ path: "../.env" });



dotenv.config({ path: "../.env" });

const dbUrl = process.env.DATABASE_URL;

console.log("DATABASE_URL exists:", !!dbUrl);
console.log("DATABASE_URL type:", typeof dbUrl);

if (dbUrl) {
  const url = new URL(dbUrl);

  console.log("DB user:", url.username);
  console.log("DB host:", url.hostname);
  console.log("DB port:", url.port);
  console.log("DB name:", url.pathname);
  console.log("Password exists:", url.password.length > 0);
}

import express from "express";
import mealRoutes from "./routes/meals.js";
import type { Request, Response } from "express";
import dayMealsRouter from './dayMeals.js';
import intakeRoutes from "./routes/intake.js";
import signupRoutes from "./routes/sign-up.js";

//@ts-ignore
const app = express();


app.use(express.json());
app.use(dayMealsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Diet API is running!");
});

app.use("/api", mealRoutes);
app.use("/api", intakeRoutes);
app.use("/api", signupRoutes);
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
