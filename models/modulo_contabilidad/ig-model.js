"use strict";

var conn = require("../db-connection"),
  IGModel = () => {};

IGModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_ingresos()", cb);

IGModel.ingresosGastosPorPeriodo = (id_periodo, cb) =>
  conn.query(
    "SELECT * FROM contabilidad.ft_select_ingresos_gastos_por_periodo($1)",
    [id_periodo],
    cb
  );

module.exports = IGModel;
