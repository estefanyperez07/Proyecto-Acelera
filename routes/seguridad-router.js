"use strict";

  var UsuarioController = require("../controllers/modulo_seguridad/registro-controller"),
  express = require("express"),
  router = express.Router();

  router
  //Registro
  .get("/ms_registro/getall", UsuarioController.getAll)
  .get("/ms_registro/getone/:id_usuario", UsuarioController.getOne)
  .put("/ms_registro/actualizar-insertar/:id_usuario", UsuarioController.save)
  .delete("/ms_registro/eliminar/:id_usuario", UsuarioController.delete)



 .use(UsuarioController.error404);


module.exports = router;
