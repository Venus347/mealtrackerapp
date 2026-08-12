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

// POST intake
router.post("/intake", async (req, res) => {
  try {
    const {
      uuid,
      age,
      height,
      weight,
      sex,
      bmi,
      activityFrequency,
      activityType,
      fitnessGoal,
    } = req.body;

    if (!uuid) {
      return res.status(400).json({
        error: "uuid is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const intake = await prisma.userInfo.create({
      data: {
        uuid,
        age,
        height,
        weight,
        sex,
        bmi,
        activityFrequency,
        activityType,
        fitnessGoal,
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

export default router;