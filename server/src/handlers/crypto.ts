import Crypto from "../models/Crypto.model";
import express, { Request, Response } from "express";

export const insertCryptoData = async () => {
    try {
        const response = await fetch("https://api.livecoinwatch.com/coins/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "1743b6f4-f2e0-4639-b72f-f7fc25ce5fd3",
            },
            body: JSON.stringify({
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        const cryptoData = data.map((crypto: any) => ({
            name: crypto.name,
            imageUrl: crypto.png64,
            price: crypto.rate,
            marketcap: crypto.cap,
        }));

        await Crypto.insertMany(cryptoData);

        const count = await Crypto.countDocuments();
        if (count > 100) {
            const oldestDocuments = await Crypto.find()
                .sort({ createdAt: 1 })
                .limit(5);
            await Crypto.deleteMany({
                _id: { $in: oldestDocuments.map((doc) => doc._id) },
            });

        }
    } catch (error: any) {
        console.error("Error inserting crypto data:", error.message);
    }
};

export const getCryptoData = async (
    req: Request,
    res: Response
) => {
    try {
        const { name } = req.params;

        const cryptoData: any = await Crypto.find({ name }).sort({
            createdAt: -1,
        });


        if (!cryptoData) {
            return res.status(404).json({ error: "Crypto data not found" });
        }

        res.json(cryptoData);
    } catch (error: any) {
        console.error("Error fetching crypto data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
