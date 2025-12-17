import client from '../config/redis.js'
import crypto from 'crypto'

const generateCacheKey = (codeSnippet) => {
    return crypto.createHash('sha256').update(codeSnippet).digest('hex');

}

export const checkCache = async (req, res, next) => {
    const { code } = req.body
    if(!code) return next()

    const cacheKey = `review:${generateCacheKey(code)}`;
    try {
        const cachedData = await client.get(cacheKey)
        if(cachedData){
            console.log('Cache HIT: Serving from redis')
            return res.status(200).json({
                source: 'cache',
                data: JSON.parse(cachedData)
            })
        
        }
        console.log("Cahe MISS: Forwarding to controller")
        req.cacheKey = cacheKey
        next()
    } catch (error) {
        console.error('Error checking cache:', error)
        next()
    }
};

