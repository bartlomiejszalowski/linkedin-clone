import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept json data
app.use(cookieParser()); // to accept cookies

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
  connectDB();
});
