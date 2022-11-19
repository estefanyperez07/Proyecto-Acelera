"use strict";

var CambioContrasenaModel = require("../../models/modulo_seguridad/editar_usuario-model"),
  CambioContrasenaController = () => {};


CambioContrasenaController.save = (req, res, next) => {
  let cambiocontrasena = {
    contrasena_actual: req.params.contrasena_actual,
    contrasena_nueva: req.body.contrasena_nueva,
    contrasena_nueva_conf: req.body.contrasena_nueva_conf,
  };

  console.log(cambiocontrasena);

  CambioContrasenaModel.save(cambiocontrasena, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${cambiocontrasena.contrasena_actual}`,
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


module.exports = CambioContrasenaController;
