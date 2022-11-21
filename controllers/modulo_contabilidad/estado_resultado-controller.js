"use strict";

var EstadoResultadoModel = require("../../models/modulo_contabilidad/estado_resultado-model"),
  EstadoResultadoController = () => {};

EstadoResultadoController.getAll = (req, res, next) => {
  EstadoResultadoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de ingresos y gastos",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};




module.exports = EstadoResultadoController;