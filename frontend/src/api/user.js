

// <<< HARDCODED
const backendURL = "http://localhost:3000"
const registerPath = "/user/register"
const loginPath = "/user/login"
const checkPath = "/user/check"
// HARDCODED >>>



const treatResponseFromRegister = async (response) => {
  if (response.status === 200) {
    // response.json() = { 
    //   "email_url":"https://ethereal.email/message/veryL0ng5string",
    //   "user": { 
    //     "email": "user@example.com",
    //     "_id":   "629daec10f883a5f279f1d5c"
    //   }
    // }
    const result = await response.json()
    return result.email_url
    
  } else {
    // response.text() = "The email address user@example.com is already in use."
    return response.text()
  }
}


const treatResponseFromLogin = async (response) => {
  const status = response.status // 200 | 406
  const text = await response.text()
  // "Invalid email address or password."
  // OR `User ${email} logged in.`

  return {
    status,
    text
  }
}


export const register = async (formData) => {
  // console.log("formData:", formData);
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(formData);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const url = `${backendURL}${registerPath}`

  const response = await fetch(url, requestOptions)
  const message = await treatResponseFromRegister(response)

  // EITHER:
  //   Link (starting with "http") to the email holding site
  // OR:
  //   "The email address user@example.com is already in use."

  return message
}


export const logIn = async (formData) => {
  // console.log("formData:", formData);
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(formData);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const url = `${backendURL}${loginPath}`

  const response = await fetch(url, requestOptions)
  const result = await treatResponseFromLogin(response)

  // {
  //   status: <200 | 406>
  //   text:   < `User ${email} logged in.`
  //           | "Invalid email address or password."
  //           >
  // }

  return result
}


export const checkLogin = async () => {
  const requestOptions = {
    method: 'GET',
  };

  const url = `${backendURL}${checkPath}`

  const response = await fetch(url, requestOptions)

  // response may contain an HttpOnly cookie which will be sent
  // back to the backend each time a request is made to it.
  // However, JavaScript has no access to HttpOnly cookies,
  // so we'll expect a JSON object with the format
  //
  //  { loggedIn: <false | email_address > }

  let loggedIn = ""

  try {
    const loggedInStatus = await response.json();
    ({ loggedIn } = loggedInStatus)

  } catch(error) {
    console.log("error:", error);
  }

  return loggedIn // false | <email_address>
}