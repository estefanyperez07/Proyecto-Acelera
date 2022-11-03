"use strict";

var BitacoraModel = require("../../models/modulo_facturacion_inventario/bitacora-model"),
  BitacoraController = () => {};

BitacoraController.getAllByDate = (req, res, next) => {
  let parametros = {
    fecha_inicio: req.body.fecha_inicio,
    fecha_final: req.body.fecha_final,
  };
  console.log(parametros);
  BitacoraModel.getAllByDate(parametros, (err, rows) => {
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

BitacoraController.getOne = (req, res, next) => {
  let cod_categoria = req.params.cod_categoria;
  console.log(cod_categoria);

  BitacoraModel.getOne(cod_categoria, (err, rows) => {
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

BitacoraController.save = (req, res, next) => {
  let parametros = {
    fecha: req.body.fecha,
    id_usuario: req.body.id_usuario,
    id_objeto: req.body.id_objeto,
    accion: req.body.accion,
    descripcion: req.body.descripcion,
  };

  console.log(parametros);

  BitacoraModel.save(parametros, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${parametros}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

BitacoraController.delete = (req, res, next) => {
  let parametros = {
    fecha_inicio: req.body.fecha_inicio,
    fecha_final: req.body.fecha_final,
  };

  BitacoraModel.delete(parametros, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${parametros}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
    }
  });
};

BitacoraController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

BitacoraController.error404 = (req, res, next) => {
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

module.exports = BitacoraController;
