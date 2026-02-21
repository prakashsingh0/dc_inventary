import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./config/db.js";   // ✅ Mongo connection

import serverRoutes from "./routes/server.routes.js";
import dataCenterRoutes from "./routes/dataCenter.routes.js";
import componentRoutes from "./routes/component.routes.js";
import replacementRoutes from "./routes/replacement.routes.js";
import stockRoutes from "./routes/stocks.routes.js";

import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

const app = express();

// ✅ Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/data-centers", dataCenterRoutes);
app.use("/api/servers", serverRoutes);
app.use("/api/component", componentRoutes);
app.use("/api/replacements", replacementRoutes);
app.use("/api/stocks", stockRoutes);

app.get("/", (req, res) => {
  res.send("Mongo Server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
