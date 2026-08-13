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


// CREATE USER
router.post("/sign-up", async (req, res) => {
  try {
    const { username, firstName, lastName } = req.body;

    if (!username || !firstName || !lastName) {
      return res.status(400).json({
        error: "username, firstName, and lastName are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create user",
    });
  }
});


// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        info: true,
        meals: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get users",
    });
  }
});


// GET ONE USER
router.get("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        uuid,
      },
      include: {
        info: true,
        meals: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get user",
    });
  }
});


// UPDATE USER
router.put("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const { username, firstName, lastName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const user = await prisma.user.update({
      where: {
        uuid,
      },
      data: {
        username,
        firstName,
        lastName,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update user",
    });
  }
});


// DELETE USER
router.delete("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    await prisma.user.delete({
      where: {
        uuid,
      },
    });

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete user",
    });
  }
});


export default router;