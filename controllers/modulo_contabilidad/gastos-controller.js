"use strict";

var GastosModel = require("../../models/modulo_contabilidad/gastos-model"),
  GastosController = () => {};

GastosController.getAll = (req, res, next) => {
  GastosModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de gastos",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = GastosController;