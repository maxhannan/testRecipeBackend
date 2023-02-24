const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = async(request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRETKEY)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.user = await User.findById(decodedToken.id)
  next()
}

module.exports = userExtractor