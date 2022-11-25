"use strict";

var conn = require("../db-connection"),
  IngresosModel = () => {};

IngresosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_ingresos()", cb);


module.exports = IngresosModel;