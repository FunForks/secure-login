/**
 * getid.js
 * 
 * This middleware is for demonstration only. It expects to find
 * a token which, when decoded, contains both _id and email fields.
 * It then uses the email field to find a user document and returns
 * the _id of that document... but the _id was already stored in
 * the token, so all this is unnecessary.
 * 
 * It simple demonstrates how a call to the backend can be
 * authorized by a JWT token.
 * 
 * Responds with:
 *   status: 406
 *   error: "Invalid data"
 * OR 
 *   status: 200
 *   json: { _id }
 */


const { findUser } = require('../controllers/userController')
const { decodeToken } = require('../api/token')


module.exports = async (request, response) => {
  const { token } = request.body
  const payload = decodeToken( token )
  // { status: <200 | 40X>,
  //   error: <missing | JWT error>
  //   _id:   <"veryL0ng5tring" | missing if error>
  //   email: < email_address | missing if error>
  // }
  const { email } = payload // may be undefined

  const invalid = () => {
    response
      .status(406)
      .json({ error: "Invalid data" })
  }

  if (!email) {
    return invalid()
  }

  const user = await findUser({ email })

  if (!user || user instanceof Error) {
    return invalid()
  }

  // If we get here, we can return a user _id
  const { _id } = user

  response
    .status(200)
    .json({ _id })
}
 