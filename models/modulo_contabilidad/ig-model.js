"use strict";

var conn = require("../db-connection"),
  IGModel = () => {};

IGModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_ingresos()", cb);


module.exports = IGModel;