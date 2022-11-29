"use strict";

var conn = require("../db-connection"),
  TotalIngresosModel = () => {};

TotalIngresosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_total_ingresos()", cb);


module.exports = TotalIngresosModel;