import express, { Request, Response } from "express";
import connectToMongoDB from "./db/connection";
import { getCryptoData, insertCryptoData } from "./handlers/crypto";
import cron from "node-cron";
import cors from 'cors';

const app = express();
const port = 3000;


app.use(cors())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
app.get('/api/crypto/:name', getCryptoData );

app.listen(port, async () => {
  await connectToMongoDB();
   startCronJob();
  console.log(`Server is running at http://localhost:${port}`);
});

const startCronJob = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("Running cron job to insert crypto data...");
    await insertCryptoData();
  });
};
