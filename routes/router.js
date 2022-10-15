"use strict";

var CategoriaController = require("../controllers/categoria-controller"),
  DescuentoController = require("../controllers/descuento-controller"),
  ImpuestoController = require("../controllers/impuesto-controller"),
  express = require("express"),
  router = express.Router();

router
  //.get('/agregar', CategoriaController.addForm)
  //.post('/', CategoriaController.save)
  //****CATEGORIAS****
  .get("/categoria/getall", CategoriaController.getAll)
  .get("/categoria/getone/:id_categoria", CategoriaController.getOne)
  .put("/categoria/actualizar-insertar/:id_categoria", CategoriaController.save)
  .delete("/categoria/eliminar/:id_categoria", CategoriaController.delete)
  //****DESCUENTOS****
  .get("/descuento/getall", DescuentoController.getAll)
  .get("/descuento/getone/:id_descuento", DescuentoController.getOne)
  .put("/descuento/actualizar-insertar/:id_descuento", DescuentoController.save)
  .delete("/descuento/eliminar/:id_descuento", DescuentoController.delete)
  //****IMPUESTOS****
  .get("/impuesto/getall", ImpuestoController.getAll)
  .get("/impuesto/getone/:id_impuesto", ImpuestoController.getOne)
  .put("/impuesto/actualizar-insertar/:id_impuesto", ImpuestoController.save)
  .delete("/impuesto/eliminar/:id_impuesto", ImpuestoController.delete)
  .use(CategoriaController.error404);

module.exports = router;
