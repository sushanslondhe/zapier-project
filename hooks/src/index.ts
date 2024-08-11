import Express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = Express();
app.use(Express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    message: "webhook received",
  });
});

app.listen(3001, () => {
  console.log("port running");
});
