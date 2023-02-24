const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const tokenExtractor = require('./Middleware/tokenExtractor')
const userExtractor = require('./Middleware/userExtractor')

const app = express()

app.use(express.json())
// Custom Middleware
app.use(tokenExtractor)
app.use(userExtractor)
// Routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)

//Database
mongoose.set('strictQuery',false)

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
