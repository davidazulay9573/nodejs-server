const fs = require("fs");
const onFinished = require("on-finished");

module.exports = (req, res, next) => {
  const date = new Date();
  const time = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const fileName = `${date.getDate().toString().padStart(2, "0")},${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")},${date.getFullYear()}`;

  const logStream = fs.createWriteStream(
    `./logs/${fileName}.log`,
    {
      flags: "a",
    }
  );
  
  onFinished(res, (err, response) => {
    if (res.statusCode >= 400) {
      const logData = `${time} - Path: ${req.originalUrl}, Status Code: ${res.statusCode}, Message: ${res.statusMessage}\n`;
      logStream.write(logData);
    }
  });

  next();
}

