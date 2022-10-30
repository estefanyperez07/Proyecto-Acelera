"use strict";

var CentroCostoModel = require("../../models/modulo_facturacion_inventario/centro_costo-model"),
  CentroCostoController = () => {};

CentroCostoController.getAll = (req, res, next) => {
  CentroCostoModel.getAll((err, rows) => {
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

CentroCostoController.getOne = (req, res, next) => {
  let cod_centro_costo = req.params.cod_centro_costo;
  console.log(cod_centro_costo);

  CentroCostoModel.getOne(cod_centro_costo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_centro_costo}`,
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

CentroCostoController.save = (req, res, next) => {
  let centro_costo = {
    cod_centro_costo: req.body.cod_centro_costo,
    descripcion: req.body.descripcion,
    activo: req.body.activo,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(centro_costo);

  CentroCostoModel.save(centro_costo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${centro_costo.cod_centro_costo}`,
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

CentroCostoController.delete = (req, res, next) => {
  let cod_centro_costo = req.params.cod_centro_costo;
  console.log(cod_centro_costo);

  CentroCostoModel.delete(cod_centro_costo, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_centro_costo}`,
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

CentroCostoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

CentroCostoController.error404 = (req, res, next) => {
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

module.exports = CentroCostoController;
