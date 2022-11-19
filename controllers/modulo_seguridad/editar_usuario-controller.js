"use strict";

var EditarUsuarioModel = require("../../models/modulo_seguridad/editar_usuario-model"),
  EditarUsuarioController = () => {};

EditarUsuarioController.getOne = (req, res, next) => {
  let id_usuario = req.params.id_usuario;
  console.log(id_usuario);

  EditarUsuarioModel.getOne(id_usuario, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_usuario}`,
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


EditarUsuarioController.save = (req, res, next) => {
  let editarusuario = {
    id_usuario: req.params.id_usuario,
    usuario: req.body.usuario,
    nombre_usuario: req.body.nombre_usuario,
    correo_electronico: req.body.correo_electronico,
  };

  console.log(editarusuario);

  EditarUsuarioModel.save(editarusuario, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${editarusuario.id_usuario}`,
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


module.exports = EditarUsuarioController;
