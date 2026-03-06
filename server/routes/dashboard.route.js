import { getDashboardMetrics } from '../controllers/dashboard.controller.js'
import express from 'express'
const router = express.Router()

router.get('/metrics', getDashboardMetrics)

export default router