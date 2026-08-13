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


// CREATE INTAKE
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

    const existingInfo = await prisma.userInfo.findUnique({
      where: {
        uuid,
      },
    });

    if (existingInfo) {
      return res.status(409).json({
        error: "Intake information already exists for this user",
      });
    }

    const intake = await prisma.userInfo.create({
      data: {
        uuid,
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

    res.status(201).json(intake);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create intake",
    });
  }
});


// GET ALL INTAKE
router.get("/intake", async (req, res) => {
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
router.get("/intake/:uuid", async (req, res) => {
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
router.put("/intake/:uuid", async (req, res) => {
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
router.delete("/intake/:uuid", async (req, res) => {
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


export default router;