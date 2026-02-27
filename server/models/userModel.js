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
    githubUsername: { 
        type: String, 
        default: null 
    },
    isGithubconnected: {
        type: Boolean,
        default: false
    }
    ,
    githubInstallationId: {
        type: Number,
        default: null
    },
    connectedRepos: [{
        repoId: String,
        displayName: String,
        full_name: String, // e.g., "sarbojit/cognitoFlow"
        isPrivate: Boolean,
        url: String
    }],


}, {
    timestamps: true
})

const User = mongoose.model('User', userSChema)
export default User