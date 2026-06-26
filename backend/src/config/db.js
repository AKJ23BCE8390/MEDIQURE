import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;

export const connectDB = async () => {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });

        db = client.db("medicure");

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export { db };
export default client;