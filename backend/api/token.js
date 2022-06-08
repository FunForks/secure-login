// FUNCTIONS FOR JWT tokens // FUNCTIONS FOR JWT tokens //
const jwt = require('jsonwebtoken')


const createToken = (payload) => {
  const options = {
    expiresIn: '24h' // hours
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    options
  )

  return token
}


const createCookie = async (payload, response) => {
  const token = await createToken(payload)

  response.cookie(
    "token",
    token,
    {
      // sameSite: "none",
      // secure: true,
      httpOnly: true,
    }
  )
}


function decodeToken(token) {
  let result = {}

  if (!token) {
    result.error = { message: "No authorization token" }
    result.status = 406
    return result
  }

  // DECODE token SYNCHRONOUSLY, FOR SIMPLICITY
  try {
    result = jwt.verify(token, process.env.JWT_SECRET)
    result.status = 200
    // { .., _id, email }

  } catch (error) {
    result.error = error

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
    const { message } = error
    switch (message) {
      case "jwt expired":
        result.status = 403 // Forbidden
      break
      // FALL THROUGH BELOW
      case "invalid signature":
      case "jwt malformed":
        result.status = 401 // Unauthorized
      break
      default:
        result.status = 406 // Not acceptable
    }
  }

  return result
}


module.exports = {
  createCookie,
  createToken,
  decodeToken
}