"use strict";

var ArticuloModel = require("../models/articulo-model"),
  ArticuloController = () => {};

ArticuloController.getAll = (req, res, next) => {
  ArticuloModel.getAll((err, rows) => {
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

ArticuloController.getOne = (req, res, next) => {
  let id_articulo = req.params.id_articulo;
  console.log(id_articulo);

  ArticuloModel.getOne(id_articulo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_articulo}`,
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

ArticuloController.save = (req, res, next) => {
  let articulo = {
    id_articulo: req.body.id_articulo,
    tipo: req.body.tipo,
    descripcion: req.body.descripcion,
    descripcion_corta: req.body.descripcion_corta,
    id_impuesto: req.body.id_impuesto,
    id_categoria: req.body.id_categoria,
    precio: req.body.precio,
    id_unidad_venta: req.body.id_unidad_venta,
    id_socio_negocio: req.body.id_socio_negocio,
    id_unidad_compra: req.body.id_unidad_compra,
    codigo_barra: req.body.codigo_barra,
    id_unidad_medida: req.body.id_unidad_medida,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(articulo);

  ArticuloModel.save(articulo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${articulo.id_categoria}`,
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

ArticuloController.delete = (req, res, next) => {
  let id_articulo = req.params.id_articulo;
  console.log(id_articulo);

  ArticuloModel.delete(id_articulo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_articulo}`,
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

ArticuloController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

ArticuloController.error404 = (req, res, next) => {
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

module.exports = ArticuloController;
