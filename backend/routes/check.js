const { decodeToken} = require('../api/token')
const { findUser } = require('../controllers/userController')


module.exports = async (request, response) => {
  const { token } = request.cookies
  let result = decodeToken(token)
  let status = 200 // will be changed
  let loggedIn = false

  if (result.error) {
    // Invalid token
    // status = 406 // Not Acceptable

  } else {
    const { _id } = result
    const user = await findUser({ _id }) // model

    if (!user) {
      // Token valid but user is unknown
      // status = 403 // Forbidden

    } else {
      const userObject = user.toObject()
      if (!userObject.confirmed) {
        // Known user has not confirmed email address
        // status = 401 // Unauthorized

      } else {
        // status = 200
        loggedIn = userObject.email
      }
    }
  }

  response
    .status(status)
    .json({ loggedIn })
}
