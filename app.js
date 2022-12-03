"use strict";

var express = require("express"),
  favicon = require("serve-favicon"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  restFul = require("express-method-override")("_method"),
  routes = require("./routes/router"),
  cors = require("cors"),
  faviconURL = `${__dirname}/public/img/node-favicon.png`,
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  port = process.env.PORT || 3001,
  app = express();

app
  .set("views", viewDir)
  .set("view engine", "jade")
  .set("port", port)
  .use(cors())
  .use(favicon(faviconURL))
  // parse application/json
  .use(bodyParser.json({ limit: "500mb" }))

  // parse application/x-www-form-urlencoded
  .use(bodyParser.urlencoded({ limit: "500mb", extended: true }))
  .use(restFul)
  .use(morgan("dev"))
  .use(publicDir)
  .use(routes);

module.exports = app;
