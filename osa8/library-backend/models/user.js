const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    uniqueCaseInsensitive: true
  },
  // password: String,
  favoriteGenre: String
})
userSchema.plugin(require('mongoose-beautiful-unique-validation'))

module.exports = mongoose.model('User', userSchema)
