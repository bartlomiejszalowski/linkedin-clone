import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept json data
app.use(cookieParser()); // to accept cookies

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
  connectDB();
});
