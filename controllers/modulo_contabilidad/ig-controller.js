"use strict";

var IGModel = require("../../models/modulo_contabilidad/ig-model"),
  IGController = () => {};

IGController.getAll = (req, res, next) => {
  IGModel.getAll((err, rows) => {
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

IGController.ingresosGastosPorPeriodo = (req, res, next) => {
  let id_periodo = req.params.id_periodo;
  IGModel.ingresosGastosPorPeriodo(id_periodo, (err, rows) => {
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

module.exports = IGController;
