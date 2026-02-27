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
import dashboardRoutes from './routes/dashboard.route.js'
import userRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

connectDB()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

// Webhook route must have raw body BEFORE JSON parsing for signature verification
app.use('/api/github-webhook', express.raw({type: 'application/json'}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/code', aiRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/user', userRoutes)
app.use('/api', webhookRoutes)




app.get('/api/protected', protect, (req, res)=>{
    res.json({message: 'protected routes accessed successfully'})
})

app.listen(3000, () => console.log('Server is running on port 3000'))