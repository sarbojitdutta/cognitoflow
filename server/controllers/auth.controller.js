import { register, login, update } from '../services/auth.service.js'
import { cookieOptions } from '../config/cookies.config.js'
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const token = await register(username, email, password)
        res.cookie('authToken', token, cookieOptions)
        res.status(200).json({ message: "Registration Successful" })
    }catch(error) {
        res.status(500).json({ message: "Failed to register", error: error.message})
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await login(email, password)
        res.cookie('authToken', token, cookieOptions)
        res.status(200).json({ message: "Login Successful" })
    } catch (error) {
        res.status(500).json({ message: "Failed to Login", error: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.user.id
        const { username, email, password, bio } = req.body
        const updatedUser = await update(id, username, email, password, bio)
        res.status(200).json({ message: "User updated successfully", user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: "Failed to Update User", error: error.message })
    }

}