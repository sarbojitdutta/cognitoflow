import generateReview from "../services/ai.service.js";
import client from '../config/redis.js';

const getReview = async (req, res) => {
    try {
        const { code, type } = req.body; 
        const cacheKey = req.cacheKey;

        if (!code) {
            return res.status(400).json({ message: "Code is required" });
        }
        const contextType = type === 'pr' ? 'pr' : 'manual';

        const review = await generateReview(code, contextType);

        await client.set(cacheKey, JSON.stringify(review), {
            EX: 86400 // 24 hours
        });

        return res.status(200).json({ 
            message: "Review generated successfully", 
            review: review 
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ 
            message: "Failed to generate review", 
            error: error.message 
        });
    }
};

export default getReview;