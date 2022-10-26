"use strict";

var SucursalModel = require("../models/sucursal-model"),
  SucursalController = () => {};

SucursalController.getAll = (req, res, next) => {
  SucursalModel.getAll((err, rows) => {
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

SucursalController.getOne = (req, res, next) => {
  let id_sucursal = req.params.id_sucursal;
  console.log(id_sucursal);

  SucursalModel.getOne(id_sucursal, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_sucursal}`,
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

SucursalController.save = (req, res, next) => {
  let sucursal = {
    id_sucursal: req.body.id_sucursal,
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    rtn: req.body.rtn,
    id_centro_costo: req.body.id_centro_costo,
    id_mapa: req.body.id_mapa,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(sucursal);

  SucursalModel.save(sucursal, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${sucursal.id_sucursal}`,
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

SucursalController.delete = (req, res, next) => {
  let id_sucursal = req.params.id_sucursal;
  console.log(id_sucursal);

  SucursalModel.delete(id_sucursal, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_sucursal}`,
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

SucursalController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

SucursalController.error404 = (req, res, next) => {
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

module.exports = SucursalController;
