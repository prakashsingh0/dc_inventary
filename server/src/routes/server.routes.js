import express from "express";
import { addServer, getServerComponents, getServersByDcLocation } from "../controller/server.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/servers
router.post("/",protect, addServer);
router.get("/location/:location",protect, getServersByDcLocation);
router.get("/:id/components",protect, getServerComponents);


export default router;
