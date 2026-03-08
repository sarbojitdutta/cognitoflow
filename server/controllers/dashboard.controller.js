import Review from '../models/review.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'
export const getDashboardMetrics = async (req, res) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            console.warn('getDashboardMetrics missing userId');
            return res.status(400).json({ message: "User ID is required" })
        }
        // make sure there are no hidden spaces/newlines
        const trimmed = userId.trim();
        if (trimmed !== userId) {
            console.log('userId had whitespace, trimmed to:', JSON.stringify(trimmed));
        }
        const finalId = trimmed;

        // convert userId string to ObjectId; mongoose() will throw if invalid
        let userObjectId
        try {
            userObjectId = new mongoose.Types.ObjectId(finalId)
        } catch (err) {
            console.error('getDashboardMetrics ObjectId conversion error:', err.message, err);
            console.warn('getDashboardMetrics bad ObjectId format:', JSON.stringify(finalId), typeof finalId);
            return res.status(400).json({ message: "Invalid user ID format", value: finalId })
        }

        const metrics = await Review.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    totalPRs: { $sum: 1 },
                    totalBugsFound: { $sum: '$bugsFound' },
                    totalAdditions: { $sum: '$additions' },
                    totalDeletions: { $sum: '$deletions' },
                    totalFilesChanged: { $sum: '$fileChanged' }
                }
            }
        ])

        const result = metrics[0] || {
            totalPRs: 0,
            totalBugsFound: 0,
            totalAdditions: 0,
            totalDeletions: 0,
            totalFilesChanged: 0
        }
        const user = await User.findById(req.user.id).select('xp level flawlessReviews')
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            ...result,
            gamification: {
                xp: user.xp || 0,
                level: user.level || 1,
                flawlessReviews: user.flawlessReviews || 0
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to get dashboard metrics", error: error.message })
    }
}