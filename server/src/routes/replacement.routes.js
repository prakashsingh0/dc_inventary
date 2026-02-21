import express from "express";
import { getReplacementHistory, replaceComponent } from "../controller/replacement.controller.js";
const router = express.Router();


router.get("/", getReplacementHistory);
router.post("/replace", replaceComponent);
export default router;