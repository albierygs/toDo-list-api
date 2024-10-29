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
  date: {
    type: Date,
    required: false,
    default: new date()
  },
  done: {
    type: Boolean,
    default: false
  },
  important: {
    type: Boolean,
    default: false
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, "userId é requerido" ]
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