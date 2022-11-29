"use strict";

var conn = require("../db-connection"),
  TotalPatrimonioModel = () => {};

TotalPatrimonioModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_total_patrimonio()", cb);


module.exports = TotalPatrimonioModel;