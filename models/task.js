const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'nome é requerido' ]
  },
  description: {
    type: String,
    required: false
  },
  dateTime: {
    type: Date,
    required: false,
    default: new Date()
  },
  done: {
    type: Boolean,
    default: false
  },
  important: {
    type: Boolean,
    default: false
  },
  location: {
    name: {
      type: String,
      required: false,
      default: null
    },
    type: {
      type: String,
      enum: ['Point'],
      required: false,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: false,
      default: null
    }
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, "userId é requerido" ]
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskSchema)