"use strict";

var CorrelativoModel = require("../models/correlativo-model"),
  CorrelativoController = () => {};

CorrelativoController.getAll = (req, res, next) => {
  CorrelativoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

CorrelativoController.getOne = (req, res, next) => {
  let id_correlativo = req.params.id_correlativo;
  console.log(id_correlativo);

  CorrelativoModel.getOne(id_correlativo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_correlativo}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      let locals = {
        title: "Editar Película",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

CorrelativoController.save = (req, res, next) => {
  let correlativo = {
    id_correlativo: req.body.id_correlativo,
    cai: req.body.cai,
    sucursal_sar: req.body.sucursal_sar,
    terminal_sar: req.body.terminal_sar,
    tipo_documento_sar: req.body.tipo_documento_sar,
    correlativo_inicial: req.body.correlativo_inicial,
    correlativo_final: req.body.correlativo_final,
    correlativo_actual: req.body.correlativo_actual,
    fecha_vencimiento: req.body.fecha_vencimiento,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(correlativo);

  CorrelativoModel.save(correlativo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${correlativo.id_correlativo}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      //res.render('error', locals)
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

CorrelativoController.delete = (req, res, next) => {
  let id_correlativo = req.params.id_categoria;
  console.log(id_correlativo);

  CorrelativoModel.delete(id_correlativo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_correlativo}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

CorrelativoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

CorrelativoController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso No Encontrado",
      error: error,
    };

  error.status = 404;

  res.render("error", locals);

  next();
};

module.exports = CorrelativoController;
