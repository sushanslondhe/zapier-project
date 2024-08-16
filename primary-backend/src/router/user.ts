import { Router } from "express";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parseData = SignupSchema.safeParse(body);

  if (!parseData.success) {
    console.log(parseData.error);
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExist = await prismaClient.user.findFirst({
    where: {
      email: parseData.data.username,
    },
  });

  if (userExist) {
    return res.status(403).json({
      message: "user already exist",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parseData.data.username,
      password: parseData.data.password,
      name: parseData.data.name,
    },
  });
  // send mail

  res.json({
    message: "Please verify your acc by checking your mail",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parseData = SigninSchema.safeParse(body);

  if (!parseData.success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parseData.data.username,
      password: parseData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "sorry credentials are incorrect",
    });
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  console.log(token);

  res.json({
    message: "You are signed in ",
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // TODO: Fix the type
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
