"use strict";

var PosModel = require("../models/pos-model"),
  PosController = () => {};

PosController.getAll = (req, res, next) => {
  PosModel.getAll((err, rows) => {
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

PosController.getOne = (req, res, next) => {
  let id_pos = req.params.id_pos;
  console.log(id_pos);

  PosModel.getOne(id_pos, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_pos}`,
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

PosController.save = (req, res, next) => {
  let pos = {
    id_categoria: req.body.id_categoria,
    descripcion: req.body.descripcion,
    id_sucursal: req.body.id_sucursal,
    id_correlativo: req.body.id_correlativo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(pos);

  PosModel.save(pos, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${pos.id_pos}`,
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

PosController.delete = (req, res, next) => {
  let id_pos = req.params.id_pos;
  console.log(id_pos);

  PosModel.delete(id_pos, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_pos}`,
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

PosController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

PosController.error404 = (req, res, next) => {
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

module.exports = PosController;
