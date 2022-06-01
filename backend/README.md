# Add user with confirmation email

This repo demonstrates the creation of a new user document when a POST is made http://localhost:3000/register with an email and a password.

The format of the email is not verified.
The password is hashed and saved in MongoDB in its hashed form
The User document's `confirmed` property is set to `false`.

An "email" is sent to a fake SMTP server at [ethereal.email](https://ethereal.email/), where it can be viewed in a browser, and the link within it can be clicked. This "confirms" that the email address exists, and updates the `confirmed` property of the User document to `true`.

No frontend is provided. You can call the backend using Postman or Insomnia.