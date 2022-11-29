"use strict";

var conn = require("../db-connection"),
  TotalPasivoModel = () => {};

TotalPasivoModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_total_pasivo()", cb);


module.exports = TotalPasivoModel;