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

// POST sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      firstName,
      lastName,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
        firstName,
        lastName,
      },
    });

    res.status(201).json({
      uuid: user.uuid,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create user",
    });
  }
});

export default router;