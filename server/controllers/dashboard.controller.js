import Review from '../models/review.js'
export const getDashboardMetrics = async (req, res) => {
    try {
        const userId = req.user._id

        const metrics = await Review.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId), status: 'success'}},
            {
                $group: {
                    _id: null,
                    totalPRs: {$sum: 1},
                    totalBugsFound: {$sum: '$bugsFound'},
                    totalAdditions: {$sum: '$additions'},
                    totalDeletions: {$sum: '$deletions'},
                    totalFilesChanged: {$sum: '$fileChanged'}
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
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Failed to get dashboard metrics", error: error.message })
    }
}