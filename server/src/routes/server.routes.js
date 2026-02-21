import express from "express";
import { addServer, getServerComponents, getServersByDcLocation } from "../controller/server.controller.js";

const router = express.Router();

// POST /api/servers
router.post("/", addServer);
router.get("/location/:location", getServersByDcLocation);
router.get("/:id/components", getServerComponents);


export default router;
