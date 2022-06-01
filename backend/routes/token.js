// FUNCTIONS FOR JWT tokens // FUNCTIONS FOR JWT tokens //
const jwt = require('jsonwebtoken')



function generateAccessToken(payload) {
  const options = {
    expiresIn: '30s'
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    options
  )

  return token
  // Decode with https://jwt.io/#debugger-io
}


function authenticateToken(request, response, next) {
  let token

  const authHeader = request.headers["authorization"]
  if (typeof authHeader !== "string") {
    ( { token } = request.cookies )
  } else {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return response.status(401).send("No authorization")
  }

  const callback = (error, result) => {
    if (error) {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
      const { message } = error
      switch (message) {
        case "jwt expired":
          response.status(403) // Forbidden
        break
        // FALL THROUGH BELOW
        case "invalid signature":
        case "jwt malformed":
          response.status(401) // Unauthorized
        break
      }

      return response.error = message
    }

    // No error. Proceed.
    response.status(200)
    request.username = result.username
  }

  jwt.verify(token, process.env.JWT_SECRET, callback)
  next()
}


const createToken = (request, response, next) => {
  const { body } = request
  const { username } = body
  const token = generateAccessToken({ username })

  response.cookie(
    "token",
    token,
    { httpOnly: true }
  );

  // // USE ONE OR OTHER OF THE FOLLOWING responseS
  // response.json({ token })
  response.send("Token added as HttpOnly cookie")
}



const verifyToken = (request, response, next) => {
  const { username } = request

  if (!username) {
    return response.send(response.error)
  }

  response.send(`Access requested by ${JSON.stringify(request.username)}`)
}


module.exports = {
  createToken,
  authenticateToken,
  verifyToken
}