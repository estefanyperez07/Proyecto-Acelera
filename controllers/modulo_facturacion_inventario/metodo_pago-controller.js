"use strict";

var MetodoPagoModel = require("../../models/modulo_facturacion_inventario/metodo_pago-model"),
  MetodoPagoController = () => {};

MetodoPagoController.getAll = (req, res, next) => {
  MetodoPagoModel.getAll((err, rows) => {
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

MetodoPagoController.getAllActive = (req, res, next) => {
  MetodoPagoModel.getAllActive((err, rows) => {
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

MetodoPagoController.getOne = (req, res, next) => {
  let cod_metodo_pago = req.params.cod_metodo_pago;
  console.log(cod_metodo_pago);

  MetodoPagoModel.getOne(cod_metodo_pago, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_metodo_pago}`,
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

MetodoPagoController.save = (req, res, next) => {
  let metodo_pago = {
    cod_metodo_pago: req.body.cod_metodo_pago,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo,
    cuenta_contable: req.body.cuenta_contable,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(metodo_pago);

  MetodoPagoModel.save(metodo_pago, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${metodo_pago.cod_metodo_pago}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).json("Success");
      //res.redirect('/')
    }
  });
};

MetodoPagoController.delete = (req, res, next) => {
  let cod_metodo_pago = req.params.cod_metodo_pago;
  console.log(cod_metodo_pago);

  MetodoPagoModel.delete(cod_metodo_pago, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_metodo_pago}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).json("Success");
      //res.redirect('/')
    }
  });
};

MetodoPagoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

MetodoPagoController.error404 = (req, res, next) => {
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

module.exports = MetodoPagoController;
