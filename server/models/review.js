import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    repoOwner: String,
    repoName: String,
    prNumber: Number,
    prTitle: String,
    aiReview: String,

    bugsFound: {type: Number, default: 0},
    additions: {type: Number, default: 0},
    deletions: {type: Number, default: 0},
    fileChanged: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.model('Review', ReviewSchema)