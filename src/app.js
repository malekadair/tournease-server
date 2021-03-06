require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const tournamentsRouter = require("./tournaments/tournaments-router");
const authRouter = require("./auth/auth-router");

const app = express();
const { CLIENT_ORIGIN } = require("./config");

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test"
  })
);
app.use(helmet());
app.use(cors());

app.use("/api", tournamentsRouter);
app.use("/api/auth", authRouter);


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
