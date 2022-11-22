"use strict";

var conn = require("../db-connection"),
  EstadoResultadoModel = () => {};

EstadoResultadoModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_estado_resultados()", cb);


module.exports = EstadoResultadoModel;