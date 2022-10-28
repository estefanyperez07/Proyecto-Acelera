"use strict";

var PromoModel = require("../models/promo-model"),
  PromoController = () => {};

PromoController.getAll = (req, res, next) => {
  PromoModel.getAll((err, rows) => {
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

PromoController.getOne = (req, res, next) => {
  let cod_promo = req.params.cod_promo;
  console.log(cod_promo);

  PromoModel.getOne(cod_promo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_promo}`,
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

PromoController.save = (req, res, next) => {
  let promo = {
    cod_promo: req.body.cod_promo,
    desc_promo: req.body.desc_promo,
    precio: req.body.precio,
    id_categoria: req.body.id_categoria,
    valida_hasta: req.body.valida_hasta,
    estado: req.body.estado,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion
  };

  console.log(promo);

  PromoModel.save(promo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${promo.cod_promo}`,
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

PromoController.delete = (req, res, next) => {
  let cod_promo = req.params.id_promo;
  console.log(cod_promo);

  PromoModel.delete(cod_promo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_promo}`,
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

PromoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

PromoController.error404 = (req, res, next) => {
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

module.exports = PromoController;
