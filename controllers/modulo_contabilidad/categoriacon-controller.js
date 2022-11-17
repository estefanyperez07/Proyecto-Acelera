"use strict";

var CategoriaContModel = require("../../models/modulo_contabilidad/categoriacont-model"),
  CategoriaContController = () => {};

CategoriaContController.getAll = (req, res, next) => {
  CategoriaContModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de categorías",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

CategoriaContController.getOne = (req, res, next) => {
  let id_categoria = req.params.id_categoria;
  console.log(id_categoria);

  CategoriaContModel.getOne(id_categoria, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_categoria}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar categoría",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

CategoriaContController.save = (req, res, next) => {
  let categoriacont = {
    id_categoria: req.params.id_categoria,
    nombre_categoria: req.body.nombre_categoria
  };

  console.log(categoriacont);

  //FUNCIONA-----------------
  CategoriaContModel.save(categoriacont, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${categoriacont.id_categoria}`,
        description: "El registro ya existe",
        error: err.detail,
      };
      if (err.code === "23505") {
        res.status(520).json(locals);
      } else res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

CategoriaContController.delete = (req, res, next) => {
  let id_categoria = req.params.id_categoria;
  console.log(id_categoria);

  CategoriaContModel.delete(id_categoria, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_categoria}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err.detail);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

module.exports = CategoriaContController;