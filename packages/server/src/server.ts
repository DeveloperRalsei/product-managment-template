import server from "./app";
import { config } from "dotenv";
config({ path: "../../.env" });
import dbConfig from "./config/db";

const PORT = process.env.PORT || 3001;
async function connectDb() {
    try {
        await dbConfig.connectDb();
        server.listen(PORT, () => {
            console.dir("Running on port " + PORT, {
                colors: true,
            });
        });
    } catch (error) {
        console.error(error);
        setTimeout(connectDb, 5000);
        return;
    }
}

connectDb();
