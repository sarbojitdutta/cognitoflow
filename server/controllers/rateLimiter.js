import client from '../config/redis.js'

const rateLimiter = async (req, res, next) => {

    const ip = req.headers['x-forward-for'] || req.socket.remoteAddress;
    const key = `rate-limit:${ip}`

    const LIMIT = 10
    const DURATION = 60 //seconds

    try{
        const requests = await client.incr(key)

        if(requests === 1){
            await client.expire(key, DURATION)
        }
        if(requests > LIMIT){
            const ttl = await client.ttl(key)
            console.log(`⚠️ Blocked IP ${ip}: Too many requests.`)
            return res.status(429).json({message: `Too many requests. Try again in ${ttl} seconds.`})
        }
        res.setHeader('X-RateLimit-Limit', LIMIT);
        res.setHeader('X-RateLimit-Remaining', LIMIT - requests)

        next()

    }catch(err){
        console.error('Rate Limiter Error:', err)
        next()
    }
    
}
export default rateLimiter