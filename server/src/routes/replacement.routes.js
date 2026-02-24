import express from "express";
import { getReplacementHistory, replaceComponent } from "../controller/replacement.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();


router.get("/", protect, getReplacementHistory);
router.post("/replace", protect, replaceComponent);
export default router;