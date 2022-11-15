"use strict";

var EstadoModel = require("../../models/modulo_contabilidad/estado-model"),
  EstadoController = () => {};

EstadoController.getAll = (req, res, next) => {
  EstadoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de estados",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

EstadoController.getOne = (req, res, next) => {
  let id_estado = req.params.id_estado;
  console.log(id_estado);

  EstadoModel.getOne(id_estado, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_estado}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar estado",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

EstadoController.save = (req, res, next) => {
  let estado = {
    id_estado: req.params.id_estado,
    tipo_estado: req.body.tipo_estado,
  };

  console.log(estado);

  EstadoModel.save(estado, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${estado.id_estado}`,
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

EstadoController.delete = (req, res, next) => {
  let id_estado = req.params.id_estado;
  console.log(id_estado);

  EstadoModel.delete(id_estado, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_estado}`,
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



module.exports = EstadoController;
