require("dotenv/config");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const usersRouter = require("./routes/users");
const connectionRoute = require("./routes/connection");
const cardsRouter = require('./routes/cards');
const fileLogger = require("./middleware/fileLogger");

const MONGO_URI =
  config.get("NODE_ENV") === "production"
    ? config.get("MONGO_URI_ATLAS")
    : config.get("MONGO_URI_LOCAL");
;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(chalk.yellow("Conect to mongo db" ));
  })
  .catch((err) => {
    console.log("Conect Regected", err);
  });

const app = express();

app.use(require("morgan")("dev"));
app.use(cors());
app.use(express.json());
app.use(fileLogger);
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/connection", connectionRoute);
app.use('/cards', cardsRouter);

app.all("*", (req, res) => {
  res.statusMessage = "404: Page not found.";
  res.status(404).send("404: Page not found.");
  return;
});

const PORT = config.get("PORT");
app.listen(PORT, console.log(chalk.blue("Listening on port", PORT)));
