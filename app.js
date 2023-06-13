// load env variables
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./routes");

const app = express();
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// enables CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

global.__basedir = __dirname;

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Cache-Control", "no-cache")
  next();
});

// dev logging
app.use(morgan("combined"));

// parse cookie
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());

// set static folder
app.use("/static", express.static(path.join(__dirname, "public")));

// config router
route(app);

// error handle middleware
// app.use(errorHandler);

module.exports = app;
