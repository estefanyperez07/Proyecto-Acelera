"use strict";

var LibroDetalleModel = require("../../models/modulo_contabilidad/librodiariodetalle-model"),
  LibroDetalleController = () => {};

LibroDetalleController.getAll = (req, res, next) => {
  LibroDetalleModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de libro diario detalle",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

LibroDetalleController.getOne = (req, res, next) => {
  let id_libro_diario_deta = req.params.id_libro_diario_deta;
  console.log(id_libro_diario_deta);

  LibroDetalleModel.getOne(id_libro_diario_deta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_libro_diario_deta}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar libro diario detalle",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

LibroDetalleController.save = (req, res, next) => {  //REVISAR TABLA EN BASE DE DATOS
  let librodiariodetalle = {
    id_libro_diario_deta: req.body.id_libro_diario_deta,
    id_libro_diario_enca: req.body.id_libro_diario_enca,
    id_subcuenta: req.body.id_subcuenta,
    id_estado: req.body.id_estado,
    parcial: req.body.parcial,
    monto_debe: req.body.monto_debe,
    monto_haber: req.body.monto_haber,
    sinopsis: req.body.sinopsis,
    tipo_estado: req.body.tipo_estado,
    id_usuario: req.body.id_usuario,
    nombre_usuario: req.body.nombre_usuario,
    sucursal: req.body.sucursal,
    centro_costo: req.body.centro_costo,
  };

  console.log(librodiariodetalle);

  LibroDetalleModel.save(librodiariodetalle, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${librodiariodetalle.id_libro_diario_deta}`,
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

LibroDetalleController.delete = (req, res, next) => {
  let id_libro_diario_deta = req.params.id_libro_diario_deta;
  console.log(id_libro_diario_deta);

  LibroDetalleModel.delete(id_libro_diario_deta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_libro_diario_deta}`,
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



module.exports = LibroDetalleController;