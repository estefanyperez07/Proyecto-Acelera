"use strict";

var MesaModel = require("../models/mesa-model"),
  MesaController = () => {};

MesaController.getAll = (req, res, next) => {
  MesaModel.getAll((err, rows) => {
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

MesaController.getOne = (req, res, next) => {
  let cod_mesa = req.params.cod_mesa;
  console.log(cod_mesa);

  MesaModel.getOne(cod_mesa, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_mesa}`,
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

MesaController.save = (req, res, next) => {
  let mesa = {
    cod_mesa: req.cod_mesa,
    id_mapa: req.id_mapa,
    descripcion: req.descripcion,
    pos_x: req.pos_x,
    pos_y: req.pos_y,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion
  };

  console.log(mesa);

  MesaModel.save(mesa, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${mesa.cod_mesa}`,
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

MesaController.delete = (req, res, next) => {
  let cod_mesa = req.params.cod_mesa;
  console.log(cod_mesa);

  MesaModel.delete(cod_mesa, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_mesa}`,
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

MesaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

MesaController.error404 = (req, res, next) => {
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

module.exports = MesaController;
