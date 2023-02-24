const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id',async  (request, response, next) => {
  const note = await Note
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
  response.json(note)
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
 console.log(user)
  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  
  response.json(savedNote)
})

notesRouter.delete('/:id',  async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if(note.user.toString() === request.user.id.toString()){
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({
      error: 'invalid user'
    })
  }

 
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }
  const foundNote = await Note.findById(request.params.id)
  if(foundNote.user.toString() === request.user.id.toString()){
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)
  }else{
    return response.status(401).json({
      error: 'invalid user'
    })
  }

})

module.exports = notesRouter