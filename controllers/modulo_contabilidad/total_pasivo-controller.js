"use strict";

var TotalPasivoModel = require("../../models/modulo_contabilidad/total_pasivo-model"),
  TotalPasivoController = () => {};

TotalPasivoController.getAll = (req, res, next) => {
  TotalPasivoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de total pasivo",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = TotalPasivoController;