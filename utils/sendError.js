module.exports = (res, status, message) => {
  res.statusMessage = message;
  res.status(status).send(message);
}