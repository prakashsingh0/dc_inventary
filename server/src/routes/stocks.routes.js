import express from 'express'
import { addStock, getStocks } from '../controller/stock.controller.js';


const router = express.Router()

router.post("/add", addStock);
router.get("/", getStocks);


export default router;