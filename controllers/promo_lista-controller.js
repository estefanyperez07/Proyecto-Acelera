"use strict";

var PromoListaModel = require("../models/promo_lista-model"),
  PromoListaController = () => {};

PromoListaController.getAll = (req, res, next) => {
  PromoListaModel.getAll((err, rows) => {
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

PromoListaController.getOne = (req, res, next) => {
  let id_promo = req.params.id_promo;
  console.log(id_promo);

  PromoListaModel.getOne(id_promo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_promo}`,
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

PromoListaController.save = (req, res, next) => {
  let promo_lista = {
    id_promo: req.body.id_promo,
    id_articulo: req.body.id_articulo,
  };

  console.log(promo_lista);

  PromoListaModel.save(promo_lista, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${promo_lista.id_promo}`,
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

PromoListaController.delete = (req, res, next) => {
  let id_promo = req.params.id_promo;
  console.log(id_promo);

  PromoListaModel.delete(id_promo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_promo}`,
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

PromoListaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

PromoListaController.error404 = (req, res, next) => {
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

module.exports = PromoListaController;
