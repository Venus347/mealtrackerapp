import type { Request, Response } from "express";
import dayMealsRouter from './dayMeals.js';

const express = await import("express") as any;
const app = express();
const json = express.json;

app.use(json());
app.use(dayMealsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Diet API is running!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});