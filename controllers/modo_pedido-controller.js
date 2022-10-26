"use strict";

var ModoPedidoModel = require("../models/modo_pedido-model"),
  ModoPedidoController = () => {};

ModoPedidoController.getAll = (req, res, next) => {
  ModoPedidoModel.getAll((err, rows) => {
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

ModoPedidoController.getOne = (req, res, next) => {
  let id_modo_pedido = req.params.id_modo_pedido;
  console.log(id_modo_pedido);

  ModoPedidoModel.getOne(id_modo_pedido, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_modo_pedido}`,
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

ModoPedidoController.save = (req, res, next) => {
  let modo_pedido = {
    id_modo_pedido: req.body.id_modo_pedido,
    descripcion: req.body.descripcion,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    activo: req.body.activo,
  };

  console.log(modo_pedido);

  ModoPedidoModel.save(modo_pedido, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${modo_pedido.id_categoria}`,
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

ModoPedidoController.delete = (req, res, next) => {
  let id_modo_pedido = req.params.id_modo_pedido;
  console.log(id_modo_pedido);

  ModoPedidoModel.delete(id_modo_pedido, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_modo_pedido}`,
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

ModoPedidoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

ModoPedidoController.error404 = (req, res, next) => {
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

module.exports = ModoPedidoController;
