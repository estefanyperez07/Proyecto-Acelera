"use strict";

var SubcuentaModel = require("../../models/modulo_contabilidad/subcuenta-model"),
  SubcuentaController = () => {};

SubcuentaController.getAll = (req, res, next) => {
  SubcuentaModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de subcuenta",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

SubcuentaController.getOne = (req, res, next) => {
  let id_subcuenta = req.params.id_subcuenta;
  console.log(id_subcuenta);

  SubcuentaModel.getOne(id_subcuenta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_subcuenta}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar subcuenta",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

SubcuentaController.save = (req, res, next) => {
  let subcuenta = {
    id_subcuenta: req.body.id_subcuenta,
    id_cuenta: req.body.id_cuenta,
    nombre_cuenta: req.body.nombre_cuenta,
    nombre_subcuenta: req.body.nombre_subcuenta,
    saldo: req.body.saldo,
  };

  console.log(subcuenta);

  SubcuentaModel.save(subcuenta, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${subcuenta.id_subcuenta}`,
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

SubcuentaController.delete = (req, res, next) => {
  let id_subcuenta = req.params.id_subcuenta;
  console.log(id_subcuenta);

  SubcuentaModel.delete(id_subcuenta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_subcuenta}`,
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



module.exports = SubcuentaController;
