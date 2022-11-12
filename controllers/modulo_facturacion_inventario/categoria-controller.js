"use strict";

var CategoriaModel = require("../../models/modulo_facturacion_inventario/categoria-model"),
  CategoriaController = () => {};

CategoriaController.getAll = (req, res, next) => {
  CategoriaModel.getAll((err, rows) => {
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

CategoriaController.getAllActive = (req, res, next) => {
  CategoriaModel.getAllActive((err, rows) => {
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

CategoriaController.getOne = (req, res, next) => {
  let cod_categoria = req.params.cod_categoria;
  console.log(cod_categoria);

  CategoriaModel.getOne(cod_categoria, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_categoria}`,
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

CategoriaController.save = (req, res, next) => {
  let categoria = {
    id_categoria: req.body.id_categoria,
    cod_categoria: req.body.cod_categoria,
    descripcion: req.body.descripcion,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(categoria);

  CategoriaModel.save(categoria, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el cod_categoria: ${categoria.cod_categoria}`,
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

CategoriaController.delete = (req, res, next) => {
  let cod_categoria = req.params.cod_categoria;
  console.log(cod_categoria);

  CategoriaModel.delete(cod_categoria, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_categoria}`,
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

CategoriaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

CategoriaController.error404 = (req, res, next) => {
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

module.exports = CategoriaController;
