import Storage from '../api/storage'

// <<< HARDCODED
const backendURL = "http://localhost:3000"
const registerPath = "/user/register"
const loginPath = "/user/login"
const getIdPath = "/user/getid"
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
  let token = ""
  let text = await response.text()
  // "Invalid email address or password."
  // OR
  // { token: "veryl0ng5tring",
  //   text: `User ${email} logged in.`
  // }

  try {
    const json = JSON.parse(text)
    ;({ text, token } = json)
  } catch(error) {
    // leave text and token as they are
  }

  // Save to local storage
  Storage.set({ token })

  return {
    status,
    text,
    token
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
  //   token: < "" | "veryL0ng5tring" >
  // }

  return result
}


export const getId = async (data) => {
  // console.log("data:", data);
  let _id = ""

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const url = `${backendURL}${getIdPath}`

  const response = await fetch(url, requestOptions)

  try {
    const result = await response.json();
    _id = result._id

  } catch(error) {
    console.log("error:", error);
  }

  return _id
}