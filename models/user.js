const mongoose = require('mongoose');
const validadorUnico = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [ true, 'email já cadastrado' ],
    required: [ true, 'email é requerido' ] 
  },
  name: {
    type: String,
    required: [ true, 'nome é requerido' ] 
  },
  password: {
    type: String,
    minLength: [ 6, 'password deve ter no mínimo 6 caracteres' ],
    required: [ true, 'password é requerida' ] 
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
})

userSchema.plugin(validadorUnico)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = mongoose.model('User', userSchema)