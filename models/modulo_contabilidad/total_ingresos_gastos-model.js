"use strict";

var conn = require("../db-connection"),
  TotalIngresosGastosModel = () => {};

TotalIngresosGastosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_resta_totales()", cb);


module.exports = TotalIngresosGastosModel;