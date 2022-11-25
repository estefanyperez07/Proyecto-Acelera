"use strict";

var PatrimoniosModel = require("../../models/modulo_contabilidad/patrimonios-model"),
  PatrimoniosController = () => {};

PatrimoniosController.getAll = (req, res, next) => {
  PatrimoniosModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de patrimonios",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = PatrimoniosController;