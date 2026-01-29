import express from 'express'
import Review from '../models/review.js'

const router = express.Router()

router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params
        const userReviews = await Review.find({ repoOwner: { $regex: new RegExp(`^${username}$`, 'i') } }).sort({ createdAt: -1 })
        const prsReviewed = userReviews.length
        const uniqueRepos = [...new Set(userReviews.map(r => r.repoName))];
        const activeRepos = uniqueRepos.length;

        const bugsCaught = userReviews.reduce((count, review) => {
            const issuesFound = (review.aiReview.match(/bug|error|issue|vulnerability/gi) || []).length;
            return count + issuesFound;
        }, 0);

        const recentActivity = userReviews.slice(0, 5).map(review => ({
            id: review._id,
            repo: review.repoName,
            pr: `#${review.prNumber} ${review.prTitle}`,
            status: review.aiReview.includes("clean") ? "Clean Code" : "Issues Found",
            type: review.aiReview.includes("clean") ? "success" : "danger",
            time: new Date(review.createdAt).toLocaleDateString()
        }));

        res.json({
            stats: {
                prsReviewed,
                bugsCaught,
                repoHealth: "92%",
                activeRepos
            },
            recentActivity
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
