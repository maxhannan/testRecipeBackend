const express = require('express')
const mongoose = require('mongoose')
const { mongouri } = require('./secrets')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')

const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)

mongoose.set('strictQuery',false)
mongoose.connect(mongouri)

mongoose.connect(mongouri)
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
