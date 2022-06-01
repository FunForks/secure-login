const { decodeToken} = require('../utilities/token')
const {
  findUser,
  updateUser
} = require('../controllers/userController')


module.exports = async (request, response) => {
  const { token } = request.params
  let result = decodeToken(token)

  if (result.error) {
    console.log("result.error:", result.error.message);

  } else {
    const { _id } = result

    // Abundance of caution. A user with this _id should always
    // exist, and if it doesn't the updateUser() function will
    // return a "document" with an erro 
    const user = await findUser({ _id })

    if (!user) {
      result.status = 401
      result.error = { message: `User ${user._id} not found.` }

    } else {
      
      const document = await updateUser({ _id }, { confirmed: true })

      if (document instanceof Error) {
        result.error = document
        result.status = 401

      } else {
        delete document.hash
        delete document.__v
        result = document
        result.status = 200
      }
    }
  }

  // We should take the user to the logged-in page of the sit
  // but for now, let's just return the redacted user document,
  // or the error, as JSON.
  response
    .status(result.status)
    .json( result )
}
