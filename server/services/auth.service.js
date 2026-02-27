import { signToken } from '../utils/token.util.js'
import User from '../models/userModel.js'
import { comparePassword } from '../utils/password.util.js'
import { hashPassword } from '../utils/password.util.js'

export const register = async (username, email, password) => {
    const user = await User.findOne({ email: email })
    if (user) {
        throw new Error('User already exists')
    }
    const hashedPassword = await hashPassword(password)
    const newUser = await User.create({ username: username, email: email, password: hashedPassword })
    const token = await signToken({ id: newUser._id })
    return token
}
export const login = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('User does not exist')
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
        throw new Error('Invalid password')
    }
    const token = await signToken({ id: user._id })
    return {
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            githubUsername: user.githubUsername,
            isGithubconnected: user.isGithubconnected
        },
        token: token
    }
}

export const update = async (id, username, email, password, bio) => {
    const user = await User.findById(id)
    if (!user) { throw new Error('User does not exist') }

    if (username) user.username = username
    if (email) user.email = email
    if (password) user.password = await hashPassword(password)
    if (bio !== undefined) user.bio = bio
    const updatedUser = await user.save()
    return updatedUser

}

