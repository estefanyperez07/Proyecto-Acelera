"use strict";

var UnidadMedidaModel = require("../models/unidad_medida-model"),
  UnidadMedidaController = () => {};

UnidadMedidaController.getAll = (req, res, next) => {
  UnidadMedidaModel.getAll((err, rows) => {
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

UnidadMedidaController.getOne = (req, res, next) => {
  let id_unidad_medida = req.params.id_unidad_medida;
  console.log(id_unidad_medida);

  UnidadMedidaModel.getOne(id_unidad_medida, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_unidad_medida}`,
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

UnidadMedidaController.save = (req, res, next) => {
  let unidad_medida = {
    id_unidad_medida: req.body.id_unidad_medida,
    descripcion: req.body.descripcion,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(unidad_medida);

  UnidadMedidaModel.save(unidad_medida, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${unidad_medida.id_unidad_medida}`,
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

UnidadMedidaController.delete = (req, res, next) => {
  let id_unidad_medida = req.params.id_unidad_medida;
  console.log(id_unidad_medida);

  UnidadMedidaModel.delete(id_unidad_medida, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_unidad_medida}`,
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

UnidadMedidaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

UnidadMedidaController.error404 = (req, res, next) => {
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

module.exports = UnidadMedidaController;
