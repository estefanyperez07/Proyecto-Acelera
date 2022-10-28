"use strict";

var CategoriaController = require("../controllers/categoria-controller"),
  DescuentoController = require("../controllers/descuento-controller"),
  ImpuestoController = require("../controllers/impuesto-controller"),
  ArticuloController = require("../controllers/articulo-controller"),
  CentroCostoController = require("../controllers/centro_costo-controller"),
  CorrelativoController = require("../controllers/correlativo-controller"),
  MetodoPagoController = require("../controllers/metodo_pago-controller"),
  ModoPedidoController = require("../controllers/modo_pedido-controller"),
  PosController = require("../controllers/pos-controller"),
  PromoListaController = require("../controllers/promo_lista-controller"),
  PromoController = require("../controllers/promo-controller"),
  SocioNegocioController = require("../controllers/socio_negocio-controller"),
  SucursalController = require("../controllers/sucursal-controller"),
  UnidadMedidaController = require("../controllers/unidad_medida-controller"),
  MapaController = require("../controllers/mapa-controller"),
  MesaController = require("../controllers/mesa-controller"),
  //⮊⮊⮊⮊ SEGURIDAD SEGURIDAD SEGURIDAD ⮈⮈⮈⮈ 🖐
  UsuarioController = require("../controllers/modulo_seguridad/registro-controller"),
  EstadoController = require("../controllers/modulo_seguridad/estado-controller"),
  PreguntasController = require("../controllers/modulo_seguridad/preguntas-controller"),
  PreguntasUsuarioController = require("../controllers/modulo_seguridad/preg_usuario-controller"),
  RolController = require("../controllers/modulo_seguridad/rol-controller"),
  PermisosController = require("../controllers/modulo_seguridad/permisos-controller"),
  ParametroController = require("../controllers/modulo_seguridad/parametros-controller"),
  ObjetoController = require("../controllers/modulo_seguridad/objeto-controller"),
  LoginController = require("../controllers/modulo_seguridad/login-controller"),
  express = require("express"),
  router = express.Router();

router
  //.get('/agregar', CategoriaController.addForm)
  //.post('/', CategoriaController.save)
  //****CATEGORIAS****
  .get("/categoria/getall", CategoriaController.getAll)
  .get("/categoria/getone/:cod_categoria", CategoriaController.getOne)
  .put(
    "/categoria/actualizar-insertar/:cod_categoria",
    CategoriaController.save
  )
  .delete("/categoria/eliminar/:cod_categoria", CategoriaController.delete)
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
  .put(
    "/centro_costo/actualizar-insertar/:id_centro_costo",
    CentroCostoController.save
  )
  .delete(
    "/centro_costo/eliminar/:id_centro_costo",
    CentroCostoController.delete
  )
  //****CORRELATIVO****
  .get("/correlativo/getall", CorrelativoController.getAll)
  .get("/correlativo/getone/:id_correlativo", CorrelativoController.getOne)
  .put(
    "/correlativo/actualizar-insertar/:id_correlativo",
    CorrelativoController.save
  )
  .delete("/correlativo/eliminar/:id_correlativo", CorrelativoController.delete)
  //****METODO PAGO****
  .get("/metodo_pago/getall", MetodoPagoController.getAll)
  .get("/metodo_pago/getone/:id_metodo_pago", MetodoPagoController.getOne)
  .put(
    "/metodo_pago/actualizar-insertar/:id_metodo_pago",
    MetodoPagoController.save
  )
  .delete("/metodo_pago/eliminar/:id_metodo_pago", MetodoPagoController.delete)
  //****MODO PEDIDO****
  .get("/modo_pedido/getall", ModoPedidoController.getAll)
  .get("/modo_pedido/getone/:id_modo_pedido", ModoPedidoController.getOne)
  .put(
    "/modo_pedido/actualizar-insertar/:id_modo_pedido",
    ModoPedidoController.save
  )
  .delete("/modo_pedido/eliminar/:id_modo_pedido", ModoPedidoController.delete)
  //****POS****
  .get("/pos/getall", PosController.getAll)
  .get("/pos/getone/:id_pos", PosController.getOne)
  .put("/pos/actualizar-insertar/:id_pos", PosController.save)
  .delete("/pos/eliminar/:id_pos", PosController.delete)
  //****PROMO LISTA****
  .get("/promo_lista/getall", PromoListaController.getAll)
  .get("/promo_lista/getone/:id_promo", PromoListaController.getOne)
  .put("/promo_lista/actualizar-insertar/:id_promo", PromoListaController.save)
  .delete("/promo_lista/eliminar/:id_promo", PromoListaController.delete)
  //****PROMO****
  .get("/promo/getall", PromoController.getAll)
  .get("/promo/getone", PromoController.getOne)
  .put("/promo/actualizar-insertar/:id_promo", PromoController.save)
  .delete("/promo/eliminar/:id_promo", PromoController.delete)
  //****SOCIO NEGOCIO****
  .get("/socio_negocio/getall", SocioNegocioController.getAll)
  .get("/socio_negocio/getone/:id_socio_negocio", SocioNegocioController.getOne)
  .put(
    "/socio_negocio/actualizar-insertar/:id_socio_negocio",
    SocioNegocioController.save
  )
  .delete(
    "/socio_negocio/eliminar/:id_socio_negocio",
    SocioNegocioController.delete
  )
  //****SUCURSAL****
  .get("/sucursal/getall", SucursalController.getAll)
  .get("/sucursal/getone/:id_sucursal", SucursalController.getOne)
  .put("/sucursal/actualizar-insertar/:id_sucursal", SucursalController.save)
  .delete("/sucursal/eliminar/:id_sucursal", SucursalController.delete)
  //****UNIDAD MEDIDA****
  .get("/unidad_medida/getall", UnidadMedidaController.getAll)
  .get("/unidad_medida/getone/:id_unidad_medida", UnidadMedidaController.getOne)
  .put(
    "/unidad_medida/actualizar-insertar/:id_unidad_medida",
    UnidadMedidaController.save
  )
  .delete(
    "/unidad_medida/eliminar/:id_unidad_medida",
    UnidadMedidaController.delete
  )
  //****MAPA****
  .get("/mapa/getall", MapaController.getAll)
  .get("/mapa/getone/:id_mapa", MapaController.getOne)
  .put("/mapa/actualizar-insertar/:id_mapa", MapaController.save)
  .delete("/mapa/eliminar/:id_mapa", MapaController.delete)
  //****MESA****
  .get("/mesa/getall", MesaController.getAll)
  .get("/mesa/getone/:id_mesa", MesaController.getOne)
  .put("/mesa/actualizar-insertar/:id_mesa", MesaController.save)
  .delete("/mesa/eliminar/:id_mesa", MesaController.delete)

  //⮊⮊⮊⮊ SEGURIDAD SEGURIDAD SEGURIDAD ⮈⮈⮈⮈ 🖐
  //Login
  .get("/ms_login/login", LoginController.login)
  //Registro
  .get("/ms_registro/getall", UsuarioController.getAll)
  .get("/ms_registro/getone/:id_usuario", UsuarioController.getOne)
  .put("/ms_registro/actualizar-insertar/:id_usuario", UsuarioController.save)
  .delete("/ms_registro/eliminar/:id_usuario", UsuarioController.delete)
  .post("/ms_registro/autoregistro", UsuarioController.autoregistro)
  //Estado
  .get("/ms_estado/getall", EstadoController.getAll)
  .get("/ms_estado/getone/:id", EstadoController.getOne)
  .put("/ms_estado/actualizar-insertar/:id", EstadoController.save)
  .delete("/ms_estado/eliminar/:id", EstadoController.delete)
  //Preguntas
  .get("/ms_pregunta/getall", PreguntasController.getAll)
  .get("/ms_pregunta/getone/:id_pregunta", PreguntasController.getOne)
  .put(
    "/ms_pregunta/actualizar-insertar/:id_pregunta",
    PreguntasController.save
  )
  .delete("/ms_pregunta/eliminar/:id_pregunta", PreguntasController.delete)
  //Preguntas Usuario
  .get("/ms_pregunta_usuario/getall", PreguntasUsuarioController.getAll)
  .get(
    "/ms_pregunta_usuario/getone/:id_preguntas_usuario",
    PreguntasUsuarioController.getOne
  )
  .put(
    "/ms_pregunta_usuario/actualizar-insertar/:id_preguntas_usuario",
    PreguntasUsuarioController.save
  )
  .delete(
    "/ms_pregunta_usuario/eliminar/:id_preguntas_usuario",
    PreguntasUsuarioController.delete
  )
  //Rol
  .get("/ms_rol/getall", RolController.getAll)
  .get("/ms_rol/getone/:id_rol", RolController.getOne)
  .put("/ms_rol/actualizar-insertar/:id_rol", RolController.save)
  .delete("/ms_rol/eliminar/:id_rol", RolController.delete)
  //Permisos
  .get("/ms_permisos/getall", PermisosController.getAll)
  .get("/ms_permisos/getone/:id_permiso", PermisosController.getOne)
  .put("/ms_permisos/actualizar-insertar/:id_permiso", PermisosController.save)
  .delete("/ms_permisos/eliminar/:id_permiso", PermisosController.delete)
  //Parámetros
  .get("/ms_parametros/getall", ParametroController.getAll)
  .get("/ms_parametros/getone/:id_parametro", ParametroController.getOne)
  .put(
    "/ms_parametros/actualizar-insertar/:id_parametro",
    ParametroController.save
  )
  .delete("/ms_parametros/eliminar/:id_parametro", ParametroController.delete)
  //Objetos
  .get("/ms_objetos/getall", ObjetoController.getAll)
  .get("/ms_objetos/getone/:id_objeto", ObjetoController.getOne)
  .put("/ms_objetos/actualizar-insertar/:id_objeto", ObjetoController.save)
  .delete("/ms_objetos/eliminar/:id_objeto", ObjetoController.delete)

  .use(CategoriaController.error404);

module.exports = router;
