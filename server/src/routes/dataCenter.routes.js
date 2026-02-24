import express from "express";
import { addDataCenter, getDataCenters } from "../controller/dataCenter.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/data-centers
router.post("/", protect, addDataCenter);
router.get('/', protect, getDataCenters)

export default router;
