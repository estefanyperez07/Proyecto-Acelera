"use strict";

var DestinoCuentaModel = require("../../models/modulo_contabilidad/destino_cuenta-model"),
  DestinoCuentaController = () => {};

DestinoCuentaController.getAll = (req, res, next) => {
  DestinoCuentaModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de destino cuenta",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

DestinoCuentaController.getOne = (req, res, next) => {
  let id_destino_cuenta = req.params.id_destino_cuenta;
  console.log(id_destino_cuenta);

  DestinoCuentaModel.getOne(id_destino_cuenta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_destino_cuenta}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar destino cuenta",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

DestinoCuentaController.save = (req, res, next) => {
  let destinocuenta = {
    id_destino_cuenta: req.params.id_destino_cuenta,
    id_cuenta: req.body.id_cuenta,
    id_informe_financiero: req.body.id_informe_financiero,
  };

  console.log(destinocuenta);


  //FUNCIONA--------------------
  DestinoCuentaModel.save(destinocuenta, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${destinocuenta.id_destino_cuenta}`,
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

DestinoCuentaController.delete = (req, res, next) => {
  let id_destino_cuenta = req.params.id_destino_cuenta;
  console.log(id_destino_cuenta);

  DestinoCuentaModel.delete(id_destino_cuenta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_destino_cuenta}`,
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

/*DestinoCuentaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Destino Cuenta" });

DestinoCuentaController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso No Encontrado",
      error: error,
    };

  error.status = 404;

  res.render("error", locals);

  next();
};*/

module.exports = DestinoCuentaController;