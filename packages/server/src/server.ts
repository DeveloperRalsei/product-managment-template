import app from "./app";
import { config } from "dotenv";
config({ path: "../../.env" });
import dbConfig from "./config/db";

const PORT = process.env.PORT || 3001;
dbConfig
    .connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
