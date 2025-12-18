import express from 'express'
import getReview from '../controllers/ai.controller.js'
// import protect from '../middlewares/auth.middleware.js'
import { checkCache } from '../middlewares/cache.Middleware.js'
import rateLimiter  from '../controllers/rateLimiter.js'
const router = express.Router()

router.post('/review',rateLimiter, checkCache, getReview)

export default router