import express from 'express'
import { addComponent, installFromStock, markComponentFaulty, } from '../controller/component.controller.js'


const router = express.Router()

router.post(`/`,addComponent)
router.put("/:id/faulty", markComponentFaulty);
router.post("/install-from-stock", installFromStock);




export default router