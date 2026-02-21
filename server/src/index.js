import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./config/db.js";

import serverRoutes from "./routes/server.routes.js";
import dataCenterRoutes from "./routes/dataCenter.routes.js";
import componentRoutes from "./routes/component.routes.js";
import replacementRoutes from "./routes/replacement.routes.js";
import stockRoutes from "./routes/stocks.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//  Connect DB BEFORE starting server
connectDB();

//  Middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  API Routes
app.use("/api/data-centers", dataCenterRoutes);
app.use("/api/servers", serverRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/replacements", replacementRoutes);
app.use("/api/stocks", stockRoutes);

//  Health Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

//  Production Static Serving (Vite build → dist)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}
//  Start Server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});