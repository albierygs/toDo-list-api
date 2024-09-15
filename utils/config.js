require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET
const URL_FRONT = process.env.URL_FRONT

module.exports = {
    MONGO_URL,
    PORT,
    SECRET,
    URL_FRONT
}