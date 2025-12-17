import generateReview from "../services/ai.service.js"
import client from '../config/redis.js'
const getReview = async (req, res) => {

    try {
        const code = req.body.code
        const cacheKey = req.cacheKey
        if (!code) return res.status(400).json({ message: "Code is required" })
        const review = await generateReview(code)
        res.status(200).json({ message: "Review generated successfully", review: review })

        // Storing the review in cache for 24 hours
        await client.set(cacheKey, JSON.stringify(review),{
            EX: 86400
        })
    }catch(error){
        res.status(500).json({ message: "Failed to generate review", error: error.message })
    }
}
export default getReview