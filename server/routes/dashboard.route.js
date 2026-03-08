import { getDashboardMetrics } from '../controllers/dashboard.controller.js'
import express from 'express'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router()

router.get('/metrics',protect, getDashboardMetrics)

export default router