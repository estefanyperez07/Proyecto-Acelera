"use strict";

var TotalGastosModel = require("../../models/modulo_contabilidad/total_gastos-model"),
TotalGastosController = () => {};

TotalGastosController.getAll = (req, res, next) => {
  TotalGastosModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de total gastos",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};
module.exports = TotalGastosController;