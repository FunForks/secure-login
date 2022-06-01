module.exports = function fallback (request,response) {
  response.status(404).send(`Cannot ${request.method} ${request.originalUrl}`)
}
