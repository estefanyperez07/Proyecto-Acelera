"use strict";

var ImpuestoModel = require("../../models/modulo_facturacion_inventario/impuesto-model"),
  ImpuestoController = () => {};

ImpuestoController.getAll = (req, res, next) => {
  ImpuestoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
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
  let cod_impuesto = req.params.cod_impuesto;
  console.log(cod_impuesto);

  ImpuestoModel.getOne(cod_impuesto, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_impuesto}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
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
    cod_impuesto: req.body.cod_impuesto,
    descripcion: req.body.descripcion,
    porcentaje: req.body.porcentaje,
    tipo: req.body.tipo,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(impuesto);

  ImpuestoModel.save(impuesto, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${impuesto.cod_impuesto}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

ImpuestoController.delete = (req, res, next) => {
  let cod_impuesto = req.params.cod_impuesto;
  console.log(cod_impuesto);

  ImpuestoModel.delete(cod_impuesto, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_impuesto}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
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
