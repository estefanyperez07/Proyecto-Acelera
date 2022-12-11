"use strict";

var conn = require("../db-connection"),
  BalanceModel = () => {};

BalanceModel.getAll = (id_periodo, cb) =>
  conn.query(
    "SELECT * FROM contabilidad.ft_select_balance_general($1)",
    [id_periodo],
    cb
  );

module.exports = BalanceModel;
