"use strict";

var conn = require("../db-connection"),
  ActivosModel = () => {};

ActivosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_activo()", cb);


module.exports = ActivosModel;