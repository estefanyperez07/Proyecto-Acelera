"use strict";

var EstadoResultadoModel = require("../../models/modulo_contabilidad/estado_resultado-model"),
  EstadoResultadoController = () => {};

EstadoResultadoController.getAll = (req, res, next) => {
  let id_periodo = req.params.id_periodo;
  EstadoResultadoModel.getAll(id_periodo, (err, rows) => {
    if (err) {
      res.status(520).json(err);
    } else {
      res.status(200).send(rows.rows);
    }
  });
};

module.exports = EstadoResultadoController;
