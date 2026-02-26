import express from "express";
import { addServer, getServerComponents, getServersByDcLocation } from "../controller/server.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/servers
router.post("/",protect, addServer);
router.get("/:location",getServersByDcLocation);
router.get("/:id/components",protect, getServerComponents);


export default router;
