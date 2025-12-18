import redis from 'redis'

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

client.on('error', (err) => console.log('Redis Client Error', err))
client.on('connect', () => console.log('Redis Connected !'))

client.connect()

export default client