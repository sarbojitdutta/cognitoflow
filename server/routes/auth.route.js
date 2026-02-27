import express from 'express'
import { registerUser, loginUser, updateUser, connectGithub, disconnectGithub } from '../controllers/auth.controller.js'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update',protect, updateUser)
router.post('/github/connect', protect, connectGithub)
router.post('/github/disconnect', protect, disconnectGithub)


export default router