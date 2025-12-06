import generateReview from "../services/ai.service.js"
const getReview = async (req, res) => {

    try {
        const code = req.body.code
        if (!code) return res.status(400).json({ message: "Code is required" })
        const review = await generateReview(code)
        res.status(200).json({ message: "Review generated successfully", review: review })
    }catch(error){
        res.status(500).json({ message: "Failed to generate review", error: error.message })
    }
}
export default getReview