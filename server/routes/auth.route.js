import express from 'express'
import { registerUser, loginUser, updateUser, getUserProfile, disconnectGithub } from '../controllers/auth.controller.js'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router()
import { linkGithubUser, disconnectGithub } from '../controllers/auth.controller.js'
import User from '../models/userModel.js'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update',protect, updateUser)
router.put('/github-connect', protect, linkGithubUser)
router.put('/github-disconnect', protect, disconnectGithub)

router.get('/profile', protect, getUserProfile)

export default router