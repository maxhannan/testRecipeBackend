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

app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', userExtractor, notesRouter)


const uri = process.env.MONGODB_URI
mongoose.set('strictQuery',false)


mongoose.connect(uri)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
