"use strict";

var BalanceModel = require("../../models/modulo_contabilidad/balance-model"),
  BalanceController = () => {};

BalanceController.getAll = (req, res, next) => {
  BalanceModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de balance general",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};




module.exports = BalanceController;