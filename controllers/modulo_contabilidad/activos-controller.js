"use strict";

var ActivosModel = require("../../models/modulo_contabilidad/activos-model"),
  ActivosController = () => {};

ActivosController.getAll = (req, res, next) => {
  ActivosModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de activos",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = ActivosController;