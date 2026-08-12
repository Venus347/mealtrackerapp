import express from "express";
import mealRoutes from "./routes/meals.js";
import type { Request, Response } from "express";
import dayMealsRouter from './dayMeals.js';

const app = express();
const json = express.json;

app.use(json());
app.use(dayMealsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Diet API is running!");
});

app.use("/api", mealRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
