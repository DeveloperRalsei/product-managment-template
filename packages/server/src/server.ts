import app from "./app";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} | http://localhost:${PORT}`)
);
