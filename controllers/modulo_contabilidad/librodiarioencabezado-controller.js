"use strict";

var LibroEncabezadoModel = require("../../models/modulo_contabilidad/librodiarioencabezado-model"),
  LibroEncabezadoController = () => {};

LibroEncabezadoController.getAll = (req, res, next) => {
  LibroEncabezadoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de libro diario encabezado",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

LibroEncabezadoController.getOne = (req, res, next) => {
  let id_libro_diario_enca = req.params.id_libro_diario_enca;
  console.log(id_libro_diario_enca);

  LibroEncabezadoModel.getOne(id_libro_diario_enca, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_libro_diario_enca}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar libro diario encabezado",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

LibroEncabezadoController.save = (req, res, next) => { //REVISAR TABLA EN BASE DE DATOS
  let librodiarioencabezado = {
    id_libro_diario_enca: req.body.id_libro_diario_enca,
    id_estado: req.body.id_estado,
    fecha: req.body.fecha,
    monto_debe: req.body.monto_debe,
    monto_haber: req.body.monto_haber,
    id_usuario: req.body.id_usuario,
    nombre_usuario: req.body.nombre_usuario,
  };

  console.log(librodiarioencabezado);

  LibroEncabezadoModel.save(librodiarioencabezado, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${librodiarioencabezado.id_libro_diario_enca}`,
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

LibroEncabezadoController.delete = (req, res, next) => {
  let id_libro_diario_enca = req.params.id_libro_diario_enca;
  console.log(id_libro_diario_enca);

  LibroEncabezadoModel.delete(id_libro_diario_enca, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_libro_diario_enca}`,
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

LibroEncabezadoController.post = (req, res, next) => {
  let librodiarioencabezado = {
    id_estado: req.body.id_estado,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    monto_debe: req.body.monto_debe,
    monto_haber: req.body.monto_haber,
    id_usuario: req.body.id_usuario,
    nombre_usuario: req.body.nombre_usuario,
    detalle: req.body.detalle,
  };

  console.log(JSON.stringify(librodiarioencabezado));

  LibroEncabezadoModel.post(librodiarioencabezado, (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${librodiarioencabezado}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json(rows.rows);
      //res.redirect('/')
    }
  });
};

module.exports = LibroEncabezadoController;
