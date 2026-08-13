// @ts-nocheck
// JC approved nocheck 2026-08-11

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });



import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// GET all meals
router.get("/meals", async (req, res) => {
  try {
    const meals = await prisma.meal.findMany({
      include: {
        items: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: "Failed to get meals" });
  }
});




// POST a meal
router.post("/meals", async (req, res) => {
  try {
    const { mealType, date, totalCalories, items } = req.body;

    const meal = await prisma.meal.create({
      data: {
        mealType,
        date: new Date(date),
        totalCalories: totalCalories ?? 0,

        items: {
          create: items?.map((item: any) => ({
            foodName: item.foodName,
            quantity: item.quantity,
            calories: item.calories,
            protein: item.protein,
            carbs: item.carbs,
            fat: item.fat,
          })) ?? [],
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create meal",
    });
  }
});

// GET one meal
router.get("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meal = await prisma.meal.findUnique({
      where: {
        id: id,
      },
      include: {
        items: true,
      },
    });

    if (!meal) {
      return res.status(404).json({
        error: "Meal not found",
      });
    }

    res.json(meal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get meal",
    });
  }
});

// UPDATE a meal
router.put("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { mealType, date, totalCalories, items } = req.body;

    const meal = await prisma.meal.update({
      where: {
        id: id,
      },
      data: {
        mealType,
        date: new Date(date),
        totalCalories,

        items: {
          deleteMany: {},
          create: items,
        },
      },
      include: {
        items: true,
      },
    });

    res.json(meal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update meal",
    });
  }
});
// DELETE a meal
router.delete("/meals/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meal = await prisma.meal.findUnique({
      where: {
        id: id,
      },
    });

    if (!meal) {
      return res.status(404).json({
        error: "Meal not found",
      });
    }

    await prisma.meal.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Meal deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete meal",
    });
  }
});
export default router;