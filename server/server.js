// server.js
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import sendMail from './utils/sendMail.js'

dotenv.config()

async function main() {
  const app = express()
  app.use(cors())
  const PORT = process.env.PORT || 3000

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }

  // Define user schema and model
  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    mobileNumber: String,
    password: String,
    activated: { type: Boolean, default: false },
    activationToken: String,
  })

  const User = mongoose.model('User', userSchema)

  app.use(bodyParser.json()) / // Signup route
    app.post('/api/signup', async (req, res) => {
      try {
        const { email, firstName, lastName, mobileNumber, password } = req.body

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const activationToken = Math.random().toString(36).substring(2, 15)

        const newUser = new User({
          email,
          firstName,
          lastName,
          mobileNumber,
          password: hashedPassword,
          activationToken,
        })

        await newUser.save()

        const activationLink = `${process.env.FRONTEND_URL}/activate/${activationToken}`
        const message = `
                <h2>Hello ${newUser.firstName}</h2>

                <p>Please click the url below to activate your account.</p>
                <a href="${activationLink}">${activationLink}</a>

                <p>Best wishes...</p>
          `
        const options = {
          subject: 'Email Verification',
          message,
          sendTo: newUser.email,
          sentFrom: process.env.EMAIL_USER,
        }

        try {
          const info = await sendMail(options)
          console.log(info)
        } catch (err) {
          console.error(err)
        }

        res.status(200).json({ message: 'User signed up.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    })

  // Activation route
  app.get('/api/activate/:token', async (req, res) => {
    try {
      const { token } = req.params

      const user = await User.findOne({ activationToken: token })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      user.activated = true
      user.activationToken = null
      await user.save()

      res.status(200).json({ message: 'Account activated successfully', user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  // Login route
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      if (!user.activated) {
        return res.status(403).json({ error: 'Account not activated' })
      }
      const passwordCorrect = await bcrypt.compare(password, user.password)

      if (!passwordCorrect) {
        return res.status(401).json({ error: 'Wrong password' })
      }

      res.status(200).json(user)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

main()
