"use strict";

var ImpuestoModel = require("../models/impuesto-model"),
  ImpuestoController = () => {};

ImpuestoController.getAll = (req, res, next) => {
  ImpuestoModel.getAll((err, rows) => {
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

ImpuestoController.getOne = (req, res, next) => {
  let id_impuesto = req.params.id_impuesto;
  console.log(id_impuesto);

  ImpuestoModel.getOne(id_impuesto, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_impuesto}`,
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

ImpuestoController.save = (req, res, next) => {
  let impuesto = {
    id_impuesto: req.body.id_impuesto,
    descripcion: req.body.descripcion,
    porcentaje: req.body.porcentaje,
    tipo: req.body.tipo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(impuesto);

  ImpuestoModel.save(impuesto, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${impuesto.id_impuesto}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
      res.send(locals);
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

ImpuestoController.delete = (req, res, next) => {
  let id_impuesto = req.params.id_impuesto;
  console.log(id_impuesto);

  ImpuestoModel.delete(id_impuesto, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_impuesto}`,
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

ImpuestoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

ImpuestoController.error404 = (req, res, next) => {
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

module.exports = ImpuestoController;
