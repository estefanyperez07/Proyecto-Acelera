"use strict";

var PasivosModel = require("../../models/modulo_contabilidad/pasivos-model"),
  PasivosController = () => {};

PasivosController.getAll = (req, res, next) => {
  PasivosModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de pasivos",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = PasivosController;