const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  email: { type: String, required: true},
  hash: { type: String, required: true },
  confirmed: { type: Boolean, required: true, default: false }
})

const User = mongoose.model("User", UserSchema)

module.exports = User