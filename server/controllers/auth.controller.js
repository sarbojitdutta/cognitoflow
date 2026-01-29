import { register, login, update } from '../services/auth.service.js'
import { cookieOptions } from '../config/cookies.config.js'
import { linkGithub } from '../services/auth.service.js'
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

export const linkGithubUser = async (req, res) => {
    try {
        const {githubUsername} = re.body
        const id = req.user.id

        if (!githubUsername) {
            return res.status(400).json({ message: "GitHub username is required" });
        }

        const updatedUser = await linkGithub(githubUsername, id)
        res.status(200).json({ message: "GitHub account linked successfully", user: updatedUser })
        
    }catch (error){
        console.error("Link GitHub Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}