const { createCookie, decodeToken } = require('../api/token')
const {
  findUser,
  updateUser
} = require('../controllers/userController')


module.exports = async (request, response) => {
  const { token } = request.params
  let result = decodeToken(token)

  if (result.error) {
    result.status = 406 // Unacceptable
    console.log("result.error:", result.error.message);

  } else {
    const { _id, email } = result

    const user = await findUser({ _id })

    if (!user) {
      result.status = 401 // Unauthorized
      result.error = { message: `User ${user._id} not found.` }

    } else if ((result = user.toObject()).confirmed) {
      // Send no content
      result.status = 304 // Not modified

    } else {
      const document = await updateUser({ _id }, { confirmed: true })

      if (document instanceof Error) {
        result.error = document
        result.status = 401 // Unauthorized

      } else {
        result = document
        result.status = 200

        // Prepare an HttpOnly cookie that will be sent with every
        // future request to the backend
        await createCookie(
          { email, _id },
          response
        )
      }
    }
  }

  response
    .status(result.status)
    .redirect("http://localhost:3001/login")
}
