const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
      },
    author: {
        type: String,
        required: true
      },
    url: {
        type: String,
        required: true
      },
    likes: {
        type: Number
      },
      comments: [
        {
          type: String
        }
      ],
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)
 
module.exports = mongoose.model('Blog', blogSchema)