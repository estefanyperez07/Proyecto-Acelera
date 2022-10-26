"use strict";

var DescuentoModel = require("../models/descuento-model"),
  DescuentoController = () => {};

DescuentoController.getAll = (req, res, next) => {
  DescuentoModel.getAll((err, rows) => {
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

DescuentoController.getOne = (req, res, next) => {
  let id_descuento = req.params.id_descuento;
  console.log(id_categoria);

  DescuentoModel.getOne(id_descuento, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_descuento}`,
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

DescuentoController.save = (req, res, next) => {
  let descuento = {
    id_descuento: req.body.id_descuento,
    descripcion: req.body.descripcion,
    porcentaje: req.body.porcentaje,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(descuento);

  DescuentoModel.save(descuento, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${descuento.id_descuento}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
      res.send(locals);
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

DescuentoController.delete = (req, res, next) => {
  let id_descuento = req.params.id_descuento;
  console.log(id_descuento);

  DescuentoModel.delete(id_descuento, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_descuento}`,
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
