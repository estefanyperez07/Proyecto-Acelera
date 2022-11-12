"use strict";

var DescuentoModel = require("../../models/modulo_facturacion_inventario/descuento-model"),
  DescuentoController = () => {};

DescuentoController.getAll = (req, res, next) => {
  DescuentoModel.getAll((err, rows) => {
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

DescuentoController.getAllActive = (req, res, next) => {
  DescuentoModel.getAllActive((err, rows) => {
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
    }
  });
};

DescuentoController.getOne = (req, res, next) => {
  let cod_descuento = req.params.cod_descuento;
  console.log(cod_descuento);

  DescuentoModel.getOne(cod_descuento, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_descuento}`,
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

DescuentoController.save = (req, res, next) => {
  let descuento = {
    cod_descuento: req.body.cod_descuento,
    descripcion: req.body.descripcion,
    porcentaje: req.body.porcentaje,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(descuento);

  DescuentoModel.save(descuento, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${descuento.cod_descuento}`,
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

DescuentoController.delete = (req, res, next) => {
  let cod_descuento = req.params.cod_descuento;
  console.log(cod_descuento);

  DescuentoModel.delete(cod_descuento, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_descuento}`,
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

DescuentoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

DescuentoController.error404 = (req, res, next) => {
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

module.exports = DescuentoController;
