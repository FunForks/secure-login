/** TODO
 *  - Connect to database
 *  - Check if email already registered
 *  - Check if email is valid
 *  - Generate user object:
 *     { _id: "...",
 *       email: "...",
 *       password: "...",
 *       confirmed: false
 *     }
 */

const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const {
  findUser,
  addUser
} = require('../controllers/userController')
const { sendEmail } = require('../api/sendEmail')



module.exports = async (request, response, next) => {
  const { email, password } = request.body

  const existingUser = await findUser({ email })
  if (existingUser) {
    response
      .status(406)
      .send(`The email address ${email} is already in use. If this is you, please login.`)

  } else {
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await addUser({
      email,
      hash
    })

    // TODO: CHECK FOR ERRORS
    if (user instanceof Error) {
      response
        .status(500) // internal server error
        .json( user )

    } else {

      // { email: 'user@example.com',
      //   hash: 'veryL0ng5tring',
      //   confirmed: false,
      //   _id: ObjectId,
      //   __v: 0
      // }
      
      delete user.hash // security risk
      delete user.__v  // version key, for internal use only
      delete user.confirmed // unnecessary for JWT
      
      const email_url = await sendEmail(user)

      response
        .status(200)
        .json({ email_url, user })
    }
  }
}
