# Secure Login

This repository demonstrates how to ensure that part of a website is accessible only to registerd users, whose email address has been confirmed.

The process relies on a frontend, a backend and a database, connected by many moving parts.

## Frontend
1. A public page with a form in which you can register
## Backend
2. Middleware that allows Cross-Origin access from the frontend
3. An endpoint on the backend to treat registration requests
## Database
4. A database to store the details of registed users in a collection
## Backend
5. A document schema that requires an `email` address string, a `hash` (of the user's password), and a `confirmed` flag to indicate that a unique link in a message sent to the email address has been activated.
6. A model created from the schema, to connect with the database collection
7. A controller that uses the model to interact with individual documents in the collection
8. An endpoint to deal with unique links sent by email and flip the `confirmed` flag
9. A script to create and verify JWT tokens that authorize access
10. A script to send an email to an SMTP server for delivery to the registered email address
## Frontend
9.  A public page for logging in as an existing user
10. One or more private pages that can only be visited if you are logged in
11. Routing logic that checks if you are logged in before allowing access to private pages. This uses nested paths.
12. A way to share logged-in status across pages (useContext)
13. A way to log out
---
## Optional
14. LocalStorage to save the logged-in status (JWT) between sessions

# Cross-Origin Cookies and HTTP
In modern browsers, cookies set by a third-party server must be sent with the options `SameSite: none` and `Secure: true`. You can only send `Secure` cookies from a server accessed by the `HTTPS` protocol.

In a production project, the JWT token is best sent from the backend server as an HttpOnly cookie, but this requires the cookie to be `SameSite: none`.

When you work with `http://localhost`, browsers consider the connection to be secure, but nonetheless, they do not recognize `Secure` cookies. It requires additional steps to set up an `HTTPS` service on `localhost`. 

As a consequence, this demo does not use cookies for the JWT token. The JWT token is sent as part of the JSON body of a POST request instead.

