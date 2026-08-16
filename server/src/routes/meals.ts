// @ts-nocheck
// JC approved nocheck 2026-08-11
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";
import cors from "cors";


import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";


const mealRouter = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET){
  throw new Error("JWT SECRET not set. copy to .env first");
}
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      return done(null, user ?? false);
      console.log("USER:", user);
    }
  )
);





// GET all meals
mealRouter.get("/meals", async (req, res) => {
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
mealRouter.post("/meal", passport.authenticate("jwt", { session: false }), async (req, res) => {
  console.log(req.body.breakfast[0]);
  try {
    const { foodName, date, quantity, calories, protein, carbs, fat} = req.body.breakfast[0];

     const user = req.user;
     if (!user.id) {
      return res.status(400).json({
        error: "uuid is required",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }



    const meal = await prisma.meal.create({
      data: {
        mealType: "BREAKFAST",
        userId: user.id,
        date: new Date(date),
        items: {
          create: {
            foodName: foodName,
            portion: quantity,
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fat: parseFloat(fat),
          }
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
  mealRouter.get("/meals/:id", async (req, res) => {
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
mealRouter.put("/meals/:id", async (req, res) => {
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
mealRouter.delete("/meals/:id", async (req, res) => {
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
export default mealRouter;