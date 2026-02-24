import express from 'express'
import { addComponent, installFromStock, markComponentFaulty, } from '../controller/component.controller.js'
import { protect } from '../middleware/auth.middleware.js';


const router = express.Router()

router.post(`/`, protect, addComponent)
router.put("/:id/faulty", protect, markComponentFaulty);
router.post("/install-from-stock", protect, installFromStock);




export default router