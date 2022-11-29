"use strict";

var conn = require("../db-connection"),
  GastosModel = () => {};

GastosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_gastos()", cb);


module.exports = GastosModel;