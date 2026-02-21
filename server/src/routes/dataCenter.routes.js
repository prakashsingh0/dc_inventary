import express from "express";
import { addDataCenter } from "../controller/dataCenter.controller.js";

const router = express.Router();

// POST /api/data-centers
router.post("/", addDataCenter);

export default router;
