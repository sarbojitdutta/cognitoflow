import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
    repoName: String,
    prNumber: Number,
    prTitle: String,
    filesChanged: [String],
    aiReview: String,
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.model('Review', ReviewSchema)