import mongoose from 'mongoose'

const userSChema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: '',
        maxlength: 200,
    },

}, {
    timestamps: true
})

const User = mongoose.model('User', userSChema)
export default User