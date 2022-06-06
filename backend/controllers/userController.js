const User = require('../models/User')
// http-errors
// express-validator

exports.addUser = async (userData) => {
  try {
    // VALIDATION GOES HERE
    const document = new User(userData)
    const user = await document.save()

    return user.toObject()

  } catch(error) {
    return error
  }
}

const findUser = async (params) => {
  const { _id, email } = params
  const users = _id
              ? await User.find({ _id })
              : await User.find({ email })

  return users[0] // may be undefined or object
}
exports.findUser = findUser