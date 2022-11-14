"use strict";

var PeriodoContableModel = require("../../models/modulo_contabilidad/periodo-model"),
  PeriodoContableController = () => {};

PeriodoContableController.getAll = (req, res, next) => {
  PeriodoContableModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de periodo contable",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

PeriodoContableController.getOne = (req, res, next) => {
  let id_periodo_contable = req.params.id_periodo_contable;
  console.log(id_periodo_contable);

  PeriodoContableModel.getOne(id_periodo_contable, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_periodo_contable}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar periodo contable",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

PeriodoContableController.save = (req, res, next) => {
  let periodo = {
    id_periodo_contable: req.params.id_periodo_contable,
    descripcion_periodo: req.body.descripcion_periodo,
    fecha_inicial: req.body.fecha_inicial,
    fecha_final: req.body.fecha_final,
    fecha_creacion: req.body.fecha_creacion,
    id_usuario: req.body.id_usuario,
    tipo_periodo: req.body.tipo_periodo,
    estado_periodo: req.body.estado_periodo,
  };

  console.log(periodo);

  PeriodoContableModel.save(periodo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${periodo.id_periodo_contable}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

PeriodoContableController.delete = (req, res, next) => {
  let id_periodo_contable = req.params.id_periodo_contable;
  console.log(id_periodo_contable);

  PeriodoContableModel.delete(id_periodo_contable, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_periodo_contable}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};



module.exports = PeriodoContableController;
