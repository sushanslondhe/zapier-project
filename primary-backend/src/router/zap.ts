import { Router } from "express";
import { zapCreateSchema } from "../types";
import { prismaClient } from "../db";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, async (req, resp) => {
  // @ts-ignore
  const id = req.id;
  const body = req.body;
  const parsedData = zapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return resp.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const zapId = await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        userId: parseInt(id),
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, i) => ({
            actionId: x.availableActionId,
            sortingOrder: i,
            metadata: x.actionMetadata,
          })),
        },
      },
    });

    const trigger = await prismaClient.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
    return zap.id;
  });

  return resp.json({
    zapId,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;

  const zaps = await prismaClient.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zaps,
  });
});

router.get("/:zapId", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;

  const zap = await prismaClient.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zap,
  });
});

export const zapRouter = router;
