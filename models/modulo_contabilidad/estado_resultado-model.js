"use strict";

var conn = require("../db-connection"),
  EstadoResultadoModel = () => {};

EstadoResultadoModel.getAll = (id_periodo, cb) =>
  conn.query(
    "SELECT * FROM contabilidad.ft_select_estado_resultados($1)",
    [id_periodo],
    cb
  );

module.exports = EstadoResultadoModel;
