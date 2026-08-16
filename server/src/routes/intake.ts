// @ts-nocheck
// JC approved nocheck 2026-08-11
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });


import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";

import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

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
      console.log("JWT STRATEGY RAN");
      console.log("PAYLOAD:", payload);

      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      return done(null, user ?? false);
      console.log("USER:", user);
    }
  )
);


const intakeRouter = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// CREATE INTAKE, /intake
intakeRouter.post("/survey", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const {
      age,
      feet,
      inches,
      weight,
      sex,
      bmi,
      atype,
      afreq,
      goal,
    } = req.body;

    //const user = await prisma.user.findUnique({ where: { id: payload.sub } });
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

    const existingInfo = await prisma.userInfo.findUnique({
      where: {
        userId: user.id
      },
    });

    if (existingInfo) {
      return res.status(409).json({
        error: "Intake information already exists for this user",
      });
    }

    const intake = await prisma.userInfo.create({
      data: {
        userId: user.id,
        age: Number(age),
        heightFeet: Number(feet),
        heightInches: Number(inches),
        weight: Number(weight),
        sex: sex,
        bmi: ((Number(feet)*12 + Number(inches))/Number(weight))^2,
        activityFrequency: afreq,
        activityType: atype,
        fitnessGoal: goal,
      },
    });

    res.status(201).json(intake);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create intake",
    });
  }
});


// GET ALL INTAKE
intakeRouter.get("/intake", async (req, res) => {
  try {
    const intake = await prisma.userInfo.findMany();

    res.json(intake);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get intake information",
    });
  }
});


// GET ONE USER'S INTAKE
intakeRouter.get("/intake/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const intake = await prisma.userInfo.findUnique({
      where: {
        uuid,
      },
    });

    if (!intake) {
      return res.status(404).json({
        error: "Intake information not found",
      });
    }

    res.json(intake);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get intake information",
    });
  }
});


// UPDATE INTAKE
intakeRouter.put("/intake/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const {
      age,
      height,
      weight,
      sex,
      bmi,
      activityFrequency,
      activityType,
      fitnessGoal,
    } = req.body;

    const existingInfo = await prisma.userInfo.findUnique({
      where: {
        uuid,
      },
    });

    if (!existingInfo) {
      return res.status(404).json({
        error: "Intake information not found",
      });
    }

    const intake = await prisma.userInfo.update({
      where: {
        uuid,
      },
      data: {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        sex,
        bmi: Number(bmi),
        activityFrequency,
        activityType,
        fitnessGoal,
      },
    });

    res.json(intake);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update intake information",
    });
  }
});


// DELETE INTAKE
intakeRouter.delete("/intake/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const existingInfo = await prisma.userInfo.findUnique({
      where: {
        uuid,
      },
    });

    if (!existingInfo) {
      return res.status(404).json({
        error: "Intake information not found",
      });
    }

    await prisma.userInfo.delete({
      where: {
        uuid,
      },
    });

    res.json({
      message: "Intake information deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete intake information",
    });
  }
});

export default intakeRouter;