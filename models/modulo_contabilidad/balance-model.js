"use strict";

var conn = require("../db-connection"),
  BalanceModel = () => {};

BalanceModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_balance_general()", cb);


module.exports = BalanceModel;