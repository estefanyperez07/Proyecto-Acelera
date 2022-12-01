"use strict";

var conn = require("../db-connection"),
  TotalGastosModel = () => {};

TotalGastosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_total_gastos()", cb);


module.exports = TotalGastosModel;