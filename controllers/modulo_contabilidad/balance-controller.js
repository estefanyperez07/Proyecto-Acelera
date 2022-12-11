"use strict";

var BalanceModel = require("../../models/modulo_contabilidad/balance-model"),
  BalanceController = () => {};

BalanceController.getAll = (req, res, next) => {
  let id_periodo = req.params.id_periodo;
  BalanceModel.getAll(id_periodo, (err, rows) => {
    if (err) {
      res.status(520).json(err);
    } else {
      res.status(200).send(rows.rows);
    }
  });
};

module.exports = BalanceController;
