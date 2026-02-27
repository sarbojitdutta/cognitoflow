import { register, login, update } from '../services/auth.service.js'
import { cookieOptions } from '../config/cookies.config.js'
import User from '../models/userModel.js'
import { getGithubProfile, getOAuthToken } from '../services/github.service.js'
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const token = await register(username, email, password)
        res.cookie('authToken', token, cookieOptions)
        res.status(200).json({ message: "Registration Successful" })
    }catch(error) {
        res.status(500).json({ message: "Failed to register", error: error.message})

        if(error.code === 11000){
            return res.status(400).json({ message: "Email already in use" });
        }
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await login(email, password)
        res.cookie('authToken', result.token, cookieOptions)
        res.status(200).json({ message: "Login Successful", user: result.user, token: result.token })
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

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('authToken')
        res.status(200).json({ message: "Logout Successful" })
    } catch (error) {
        res.status(500).json({ message: "Failed to Logout", error: error.message })
    }
}

export const connectGithub = async (req, res) => {
    const { code } = req.body
    const userId = req.user.id

    if(!code){
        res.status(400).json({ message: "Authorization code is required"})
    }

    const accessToken = await getOAuthToken(code)
    const githubProfile = await getGithubProfile(accessToken)

    const existingUser = await User.findOne({githubId: githubProfile.id})

    if(existingUser){
        if(existingUser._id.toString() !== userId){
            res.status(409).json({ message: "You are already connected to another account"})
        }
    }

    const updateUser = User.findByIdAndDelete(
        userId,
        {
            $set:{
                githubId: githubProfile.id,
                githubUsername: githubProfile.githubUsername,
                email: githubProfile.email,
                isGithubconnected: true
            },
        },
        { new: true }
    ).select("-password")

    res.status(200).json({
        success: true,
        message: "Github App connected successfully",
        user: updateUser
    })
}

export const disconnectGithub = async () =>{
    try{
        const userId = req.user.id

        const updateUser = User.findByIdAndDelete(
            userId,
            {
                $unset: {
                    githubId: "",
                    githubUsername: "",
                    email: "",
                    accessToken: "",
                },
                $set: {
                    isGithubconnected: false,
                }
            },
            {new: true}
        ).select("-password")

        res.status(200).json({
            success: true,
            message: "Github App disconnected successfully",
            user: updateUser
        })
    }catch(error){
        res.status(500).json({ message: "Failed to Disconnect Github", error: error.message })
    }
}
