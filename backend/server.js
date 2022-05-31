/**
 * https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 * 
 * Use Postman to send request for access token:
 * 
 *   localhost:3000/token
 *  
 * Use x-www-form-urlencoded to give username a value.
 * 
 * Retrieve a token sent by JSON in a Test:
 *   try {
 *     const jsonData = pm.response.json()
 *     const { token } = jsonData
 *     pm.environment.set("token", token);
 *   } catch (error) {
 *     console.log("No JSON data available")
 *   }
 * 
 * Use Postman to send access request:
 * 
 *    localhost:3000/access
 * 
 * Test also with Authorization set to Bearer {{token}}
 */


require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const { urlencoded } = express // used to get username from body
const jwt = require('jsonwebtoken')

const app = express()
const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`Ctrl-click to visit the backend at http://localhost:${PORT}`)
})


// FUNCTIONS FOR JWT tokens // FUNCTIONS FOR JWT tokens //

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


// DEV FEEDBACK // DEV FEEDBACK // DEV FEEDBACK // DEV FEEDBACK //

function showCookies(request, response, next) {
  const url = request.originalUrl;
  const protocol = request.protocol;
  const host = request.headers.host;

  console.log(`======
Request for ${protocol}://${host}${url}`);

  console.log("request.cookies:", request.cookies);
  console.log("======\n")
  next()
}


// MIDDLEWARE // MIDDLEWARE // MIDDLEWARE // MIDDLEWARE //

app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(showCookies)


// ENDPOINTS // ENDPOINTS // ENDPOINTS // ENDPOINTS // ENDPOINTS //

app.get("/", (request, response, next) => {
  response.status(200).send(`Connected to backend at http://localhost:${PORT}`)
})


app.get("/token", (request, response, next) => {
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
})


app.get("/access", authenticateToken, (request, response, next) => {
  const { username } = request

  if (!username) {
    return response.send(response.error)
  }
  
  response.send(`Access requested by ${JSON.stringify(request.username)}`)
})


// FALLBACK FOR UNKNOWN REQUEST // FALLBACK FOR UNKNOWN REQUEST //
app.use((request,response) => {
  response.status(404).send(`Cannot ${request.method} ${request.originalUrl}`)
})