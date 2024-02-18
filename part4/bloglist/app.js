const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const url = config.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.info('error connecting to MongoDB:', error.message)
  console.log(url)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)

module.exports = app