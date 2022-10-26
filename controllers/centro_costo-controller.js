"use strict";

var CentroCostoModel = require("../models/centro_costo-model"),
  CentroCostoController = () => {};

CentroCostoController.getAll = (req, res, next) => {
  CentroCostoModel.getAll((err, rows) => {
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

CentroCostoController.getOne = (req, res, next) => {
  let id_centro_costo = req.params.id_centro_costo;
  console.log(id_centro_costo);

  CentroCostoModel.getOne(id_centro_costo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_centro_costo}`,
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

CentroCostoController.save = (req, res, next) => {
  let centro_costo = {
    id_centro_costo: req.body.id_centro_costo,
    descripcion: req.body.descripcion,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(centro_costo);

  CentroCostoModel.save(centro_costo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${centro_costo.id_centro_costo}`,
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

CentroCostoController.delete = (req, res, next) => {
  let id_centro_costo = req.params.id_centro_costo;
  console.log(id_centro_costo);

  CentroCostoModel.delete(id_centro_costo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_centro_costo}`,
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

CentroCostoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

CentroCostoController.error404 = (req, res, next) => {
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

module.exports = CentroCostoController;
