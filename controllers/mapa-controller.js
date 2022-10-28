"use strict";

var MapaModel = require("../models/mapa-model"),
  MapaController = () => {};

MapaController.getAll = (req, res, next) => {
  MapaModel.getAll((err, rows) => {
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

MapaController.getOne = (req, res, next) => {
  let cod_mapa = req.params.cod_mapa;
  console.log(cod_mapa);

  MapaModel.getOne(cod_mapa, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_mapa}`,
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

MapaController.save = (req, res, next) => {
  let mapa = {
    cod_mapa: req.body.cod_mapa,
    descripcion: req.body.descripcion,
    res_x: req.body.res_x,
    res_y: req.body.res_y,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion
  };

  console.log(mapa);

  MapaModel.save(mapa, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${mapa.cod_mapa}`,
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

MapaController.delete = (req, res, next) => {
  let cod_mapa = req.params.cod_mapa;
  console.log(cod_mapa);

  MapaModel.delete(cod_mapa, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_mapa}`,
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

MapaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

MapaController.error404 = (req, res, next) => {
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

module.exports = MapaController;
