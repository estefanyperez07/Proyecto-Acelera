"use strict";

var SocioNegocioModel = require("../models/socio_negocio-model"),
  SocioNegocioController = () => {};

SocioNegocioController.getAll = (req, res, next) => {
  SocioNegocioModel.getAll((err, rows) => {
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

SocioNegocioController.getOne = (req, res, next) => {
  let id_socio_negocio = req.params.id_socio_negocio;
  console.log(id_socio_negocio);

  SocioNegocioModel.getOne(id_socio_negocio, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_socio_negocio}`,
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

SocioNegocioController.save = (req, res, next) => {
  let socio_negocio = {
    id_socio_negocio: req.body.id_socio_negocio,
    tipo: req.body.tipo,
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    contacto: req.body.contacto,
    correo: req.body.correo,
    rtn: req.body.rtn,
    balance: req.body.balance,
    cuenta_contable: req.body.cuenta_contable,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(socio_negocio);

  SocioNegocioModel.save(socio_negocio, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${socio_negocio.id_socio_negocio}`,
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

SocioNegocioController.delete = (req, res, next) => {
  let id_socio_negocio = req.params.id_socio_negocio;
  console.log(id_socio_negocio);

  SocioNegocioModel.delete(id_socio_negocio, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_socio_negocio}`,
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

SocioNegocioController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

SocioNegocioController.error404 = (req, res, next) => {
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

module.exports = SocioNegocioController;
