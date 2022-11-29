"use strict";

var TotalPatrimonioModel = require("../../models/modulo_contabilidad/total_patrimonio-model"),
  TotalPatrimonioController = () => {};

TotalPatrimonioController.getAll = (req, res, next) => {
  TotalPatrimonioModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de total patrimonio",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = TotalPatrimonioController;