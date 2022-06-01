const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT

const nodemailer = require("nodemailer");
const filePath = path.resolve(__dirname, '../templates/email.html')
const template = fs.readFileSync(filePath, 'utf8')

const { createToken } = require('./token')

exports.sendEmail = async (user) => {
  // Prepare the email details
  const token = createToken(user)
  const { email: to } = user
  const from = '<admin@example.com>'
  const url = `http://localhost:${PORT}/user/confirm/${token}`
  const html = template.replace("$url", url)

  // <<< DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY //
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for
  // testing
  const testAccount = await nodemailer.createTestAccount();
  // Create a reusable transporter object using the default
  // SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY >>> //

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from,
    to,
    html
  });


  // Tell Postman where to find the "email"
  const email_url = nodemailer.getTestMessageUrl(info)

  console.log("html:", html);
  console.log(`Ctrl-click to view the email at ${email_url}`)

  return email_url
}