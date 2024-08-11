import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zapier-events";
const client = new PrismaClient();

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  console.log("Processor started");
  const producer = kafka.producer();

  try {
    await producer.connect();
    console.log("Kafka producer connected");

    while (true) {
      const pendingRows = await client.zapRunOutbox.findMany({
        where: {},
        take: 10,
      });

      if (pendingRows.length > 0) {
        console.log(`Processing ${pendingRows.length} rows`);

        await producer.send({
          topic: TOPIC_NAME,
          messages: pendingRows.map((r) => ({
            value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
          })),
        });

        await client.zapRunOutbox.deleteMany({
          where: {
            id: {
              in: pendingRows.map((x) => x.id),
            },
          },
        });

        console.log(`Processed and deleted ${pendingRows.length} rows`);
      } else {
        console.log("No pending rows to process");
      }

      await new Promise((r) => setTimeout(r, 3000));
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await producer.disconnect();
    await client.$disconnect();
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
