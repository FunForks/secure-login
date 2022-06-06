const backendURL = "http://localhost:3000"
const registerPath = "/user/register"


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
  return await treatResponseFromRegister(response)
}