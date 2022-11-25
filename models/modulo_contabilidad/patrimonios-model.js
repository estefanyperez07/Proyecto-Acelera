"use strict";

var conn = require("../db-connection"),
  PatrimoniosModel = () => {};

PatrimoniosModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_patrimonio()", cb);


module.exports = PatrimoniosModel;