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

require('./data/db.js')
const userRouter = require('./routes/user')
const fallback = require('./routes/404')
const { setCors } = require("./middleware/security");

const app = express()
const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`Ctrl-click to visit the backend at http://localhost:${PORT}`)
})


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
app.use(setCors)


// ENDPOINTS // ENDPOINTS // ENDPOINTS // ENDPOINTS // ENDPOINTS //

app.get("/", (request, response, next) => {
  response.status(200).send(`Connected to backend at http://localhost:${PORT}`)
})


app.use("/user", userRouter)


// FALLBACK FOR UNKNOWN REQUEST // FALLBACK FOR UNKNOWN REQUEST //
app.use(fallback)