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
        timestamp: "desc",
      },
    });

    res.json(meals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get meals",
    });
  }
});

router.post("/meals", async (req, res) => {
  try {
    const { uuid, breakfast, lunch, dinner, snack } = req.body;

    if (!uuid) {
      return res.status(400).json({
        error: "uuid is required",
      });
    }

    const mealGroups = [
      { foods: breakfast },
      { foods: lunch },
      { foods: dinner },
      { foods: snack },
    ];

    const createdMeals = [];

    for (const group of mealGroups) {
      if (!group.foods || group.foods.length === 0) {
        continue;
      }

      const meal = await prisma.meal.create({
        data: {
          uuid,
          timestamp: group.foods[0].date
            ? new Date(group.foods[0].date)
            : new Date(),

          items: {
            create: group.foods.map((food: any) => ({
              protein: Number(food.protein) || 0,
              carbs: Number(food.carbs) || 0,
              sugar: 0,
              fat: Number(food.fat) || 0,
              energyKcal: Number(food.calories) || 0,
              portion: food.quantity || "",
            })),
          },
        },
        include: {
          items: true,
        },
      });

      createdMeals.push(meal);
    }

    res.status(201).json(createdMeals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create meal",
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