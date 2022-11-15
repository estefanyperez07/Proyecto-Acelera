"use strict";

var LibroMayorModel = require("../../models/modulo_contabilidad/libromayor-model"),
  LibroMayorController = () => {};

LibroMayorController.getAll = (req, res, next) => {
  LibroMayorModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de libro mayor",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

LibroMayorController.getOne = (req, res, next) => {
  let id_libro_mayor = req.params.id_libro_mayor;
  console.log(id_libro_mayor);

  LibroMayorModel.getOne(id_libro_mayor, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_libro_mayor}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar libro mayor",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

LibroMayorController.save = (req, res, next) => {
  let libromayor = {
    id_libro_mayor: req.params.id_libro_mayor,
    id_periodo_contable: req.body.id_periodo_contable,
    fecha: req.body.fecha,
    id_cuenta: req.body.id_cuenta,
    id_subcuenta: req.body.id_subcuenta,
    monto_debe: req.body.monto_debe,
    monto_haber: req.body.monto_haber,
    saldo: req.body.saldo,
  };

  console.log(libromayor);

  LibroMayorModel.save(libromayor, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${libromayor.id_libro_mayor}`,
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

LibroMayorController.delete = (req, res, next) => {
  let id_libro_mayor = req.params.id_libro_mayor;
  console.log(id_libro_mayor);

  LibroMayorModel.delete(id_libro_mayor, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_libro_mayor}`,
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



module.exports = LibroMayorController;