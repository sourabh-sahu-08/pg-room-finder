import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import roomsRouter from './routes/rooms.js'
import bookingsRouter from './routes/bookings.js'
import authRouter from './routes/auth.js'
import auth from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/basera'

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/bookings', bookingsRouter)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Basera API is running' })
})

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

export default app
