/**
 *
 */


const bcrypt = require('bcryptjs')

const { findUser } = require('../controllers/userController')
const { createToken } = require('../api/token')


module.exports = async (request, response, next) => {
  const { email, password } = request.body

  const invalid = (response) => {
    response
    .status(406)
    .send("Invalid email address or password.")
  }

  const user = await findUser({ email })
  if (!user) {
    // The email is wrong (but don't tell)
    return invalid(response)
  }

  const { _id, hash } = user
  const valid = await bcrypt.compare(password, hash)
  if (!valid) {
    // The email exists but the password is wrong, but don't tell
    return invalid(response)
  }

  // Prepare an HttpOnly cookie that will be sent with every
  // future request to the backend
  const token = await createToken({ email, _id })
  const text = `User ${email} logged in`

  response
    .status(200)
    .json({ token, text })
}
