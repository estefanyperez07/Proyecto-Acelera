"use strict";

var conn = require("../db-connection"),
  PasivosModel = () => {};

PasivosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_pasivo()", cb);


module.exports = PasivosModel;