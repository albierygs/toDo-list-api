const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")

const generateToken = (user, time = null) => {
  const options = time ? { expiresIn: time } : {}
  return jwt.sign({ id: user.id }, SECRET, options)
}

module.exports = { generateToken }