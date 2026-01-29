import express from 'express'
import { registerUser, loginUser, updateUser } from '../controllers/auth.controller.js'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update',protect, updateUser)
router.put('/github-connect', protect, linkGithubUser)

export default router