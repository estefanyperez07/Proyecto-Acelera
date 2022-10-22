"use strict";

var CategoriaController = require("../controllers/categoria-controller"),
  DescuentoController = require("../controllers/descuento-controller"),
  ImpuestoController = require("../controllers/impuesto-controller"),
  ArticuloController = require("../controllers/articulo-controller"),
  CentroCostoController = require("../controllers/centro_costo-controller"),
  CorrelativoController = require("../controllers/correlativo-controller"),
  MetodoPagoController = require("../controllers/metodo_pago-controller"),
  ModoPedidoController = require("../controllers/modo_pedido-controller"),

  //⮊⮊⮊⮊ SEGURIDAD SEGURIDAD SEGURIDAD ⮈⮈⮈⮈ 🖐
  UsuarioController = require("../controllers/modulo_seguridad/registro-controller"),
  EstadoController = require("../controllers/modulo_seguridad/estado-controller"),
  
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
  //****ARTICULO****
  .get("/articulo/getall", ArticuloController.getAll)
  .get("/articulo/getone/:id_articulo", ArticuloController.getOne)
  .put("/articulo/actualizar-insertar/:id_articulo", ArticuloController.save)
  .delete("/articulo/eliminar/:id_articulo", ArticuloController.delete)
  //****CENTRO COSTO****
  .get("/centro_costo/getall", CentroCostoController.getAll)
  .get("/centro_costo/getone/:id_centro_costo", CentroCostoController.getOne)
  .put("/centro_costo/actualizar-insertar/:id_centro_costo", CentroCostoController.save)
  .delete("/centro_costo/eliminar/:id_centro_costo", CentroCostoController.delete)
  //****CORRELATIVO****
  .get("/correlativo/getall", CorrelativoController.getAll)
  .get("/correlativo/getone/:id_correlativo", CorrelativoController.getOne)
  .put("/correlativo/actualizar-insertar/:id_correlativo", CorrelativoController.save)
  .delete("/correlativo/eliminar/:id_correlativo", CorrelativoController.delete)
  //****METODO PAGO****
  .get("/metodo_pago/getall", MetodoPagoController.getAll)
  .get("/metodo_pago/getone/:id_metodo_pago", MetodoPagoController.getOne)
  .put("/metodo_pago/actualizar-insertar/:id_metodo_pago", MetodoPagoController.save)
  .delete("/metodo_pago/eliminar/:id_metodo_pago", MetodoPagoController.delete)
  //****MODO PEDIDO****
  .get("/modo_pedido/getall", ModoPedidoController.getAll)
  .get("/modo_pedido/getone/:id_modo_pedido", ModoPedidoController.getOne)
  .put("/modo_pedido/actualizar-insertar/:id_modo_pedido", ModoPedidoController.save)
  .delete("/modo_pedido/eliminar/:id_modo_pedido", ModoPedidoController.delete)
  
  //⮊⮊⮊⮊ SEGURIDAD SEGURIDAD SEGURIDAD ⮈⮈⮈⮈ 🖐
  //Registro
  .get("/ms_registro/getall", UsuarioController.getAll)
  .get("/ms_registro/getone/:id_usuario", UsuarioController.getOne)
  .put("/ms_registro/actualizar-insertar/:id_usuario", UsuarioController.save)
  .delete("/ms_registro/eliminar/:id_usuario", UsuarioController.delete)
  //Estado
  .get("/ms_estado/getall", EstadoController.getAll)
  .get("/ms_estado/getone/:id", EstadoController.getOne)
  .put("/ms_estado/actualizar-insertar/:id", EstadoController.save)
  .delete("/ms_estado/eliminar/:id", EstadoController.delete)
 
  .use(CategoriaController.error404);
 
module.exports = router;
