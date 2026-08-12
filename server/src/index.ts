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