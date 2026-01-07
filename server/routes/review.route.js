import express from 'express'
import Review from '../models/review.js'

const router = express.Router()

router.get("/:owner/:repo", async (rep, res) => {
    const { owner, repo } = req.params
    const review = await Review.find({repoName: `${owner}/${repo}`}).sort({CreatedAt: -1})
    res.json(review)
})

router.get("/:owner/:id", async (rep, res) => {
    const {id} = req.params
    const review = await Review.findById(id)
    res.json(review)
})

export default router