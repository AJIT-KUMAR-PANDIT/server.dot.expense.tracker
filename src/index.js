// src/index.js
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { initializeCluster } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
// Enable CORS
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

initializeCluster()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize Couchbase connection:", error);
  });
