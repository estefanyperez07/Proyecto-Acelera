"use strict";

var IngresosModel = require("../../models/modulo_contabilidad/ingresos-model"),
  IngresosController = () => {};

IngresosController.getAll = (req, res, next) => {
  IngresosModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de ingresos",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

module.exports = IngresosController;