"use strict";

var conn = require("../db-connection"),
  TotalModel = () => {};

TotalModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_total_activo()", cb);


module.exports = TotalModel;