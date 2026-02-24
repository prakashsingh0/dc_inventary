import express from 'express'
import { addStock, getStocks } from '../controller/stock.controller.js';
import { protect } from '../middleware/auth.middleware.js';


const router = express.Router()

router.post("/add", protect, addStock);
router.get("/", protect, getStocks);


export default router;