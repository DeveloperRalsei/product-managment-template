import { connect, createConnection } from "mongoose";
import { config } from "dotenv";
config();
const MONGODB_URI = process.env.MONGODB_URI!;

async function createDb() {
    try {
        const db = createConnection(MONGODB_URI, {
            dbName: "PMS",
            autoCreate: false,
        });

        return db;
    } catch (error) {
        throw new Error(`MongoDB Connection Error: ${error}`);
    }
}

async function connectDb() {
    try {
        await connect(MONGODB_URI, {
            dbName: "PMS",
            autoCreate: false,
        });

        console.log("MongoDB Connected");
    } catch (error) {
        throw new Error(`MongoDB Connection Error: ${error}`);
    }
}

export default {
    createDb,
    connectDb,
};
