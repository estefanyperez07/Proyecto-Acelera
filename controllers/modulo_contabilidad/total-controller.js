"use strict";

var TotalModel = require("../../models/modulo_contabilidad/total-model"),
  TotalController = () => {};

TotalController.getAll = (req, res, next) => {
  TotalModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de total",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = TotalController;