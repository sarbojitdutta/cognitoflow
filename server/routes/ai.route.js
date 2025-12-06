import express from 'express'
import getReview from '../controllers/ai.controller.js'
// import protect from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post('/review', getReview)

export default router