import express from "express";
import { addDataCenter, getDataCenters } from "../controller/dataCenter.controller.js";

const router = express.Router();

// POST /api/data-centers
router.post("/", addDataCenter);
router.get('/',getDataCenters)

export default router;
