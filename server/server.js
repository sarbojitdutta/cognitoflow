import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from "cors"
const app = express()
import authRoutes from './routes/auth.route.js'
import aiRoutes from './routes/ai.route.js'
import connectDB from './config/db.js'
import protect from './middlewares/auth.middleware.js'
import webhookRoutes from './routes/webhook.route.js'

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)
app.use('/api/code', aiRoutes)
app.use('/api', webhookRoutes)



app.get('/api/protected', protect, (req, res)=>{
    res.json({message: 'protected routes accessed successfully'})
})

app.listen(3000, () => console.log('Server is running on port 3000'))