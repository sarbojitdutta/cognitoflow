import express from 'express'
import { registerUser, loginUser, updateUser } from '../controllers/auth.controller.js'
import protect from '../middlewares/auth.middleware.js'
const router = express.Router()
import { linkGithubUser } from '../controllers/auth.controller.js'
import User from '../models/userModel.js'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update',protect, updateUser)
router.put('/github-connect', protect, linkGithubUser)

router.get('/profile', protect, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
    }catch(error){
        res.status(500).json({ message: 'Server error' })
    }
})

export default router