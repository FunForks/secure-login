/**
 * 
 */

// <<< HARDCODED
const frontendURL = "http://localhost:3001"
const registerPath = "/user/register"
const loginPath = "/user/login"
// HARDCODED >>>
 
const bcrypt = require('bcrypt')

const { findUser } = require('../controllers/userController')
const { createCookie } = require('../api/token')


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
  await createCookie(
    { email, _id },
    response
  )

  response
    .status(200)
    .send(`User ${email} logged in.`)
}
