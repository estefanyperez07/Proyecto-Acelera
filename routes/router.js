"use strict";

var CategoriaController = require("../controllers/modulo_facturacion_inventario/categoria-controller"),
  DescuentoController = require("../controllers/modulo_facturacion_inventario/descuento-controller"),
  ImpuestoController = require("../controllers/modulo_facturacion_inventario/impuesto-controller"),
  ArticuloController = require("../controllers/modulo_facturacion_inventario/articulo-controller"),
  CentroCostoController = require("../controllers/modulo_facturacion_inventario/centro_costo-controller"),
  CorrelativoController = require("../controllers/correlativo-controller"),
  MetodoPagoController = require("../controllers/modulo_facturacion_inventario/metodo_pago-controller"),
  ModoPedidoController = require("../controllers/modulo_facturacion_inventario/modo_pedido-controller"),
  PosController = require("../controllers/modulo_facturacion_inventario/pos-controller"),
  PromoListaController = require("../controllers/promo_lista-controller"),
  PromoController = require("../controllers/promo-controller"),
  SocioNegocioController = require("../controllers/modulo_facturacion_inventario/socio_negocio-controller"),
  SucursalController = require("../controllers/modulo_facturacion_inventario/sucursal-controller"),
  UnidadMedidaController = require("../controllers/unidad_medida-controller"),
  MapaController = require("../controllers/mapa-controller"),
  MesaController = require("../controllers/mesa-controller"),
  ListaMaterialesController = require("../controllers/lista_materiales-controller"),
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
  .get("/descuento/getone/:cod_descuento", DescuentoController.getOne)
  .put(
    "/descuento/actualizar-insertar/:cod_descuento",
    DescuentoController.save
  )
  .delete("/descuento/eliminar/:cod_descuento", DescuentoController.delete)
  //****IMPUESTOS****
  .get("/impuesto/getall", ImpuestoController.getAll)
  .get("/impuesto/getone/:cod_impuesto", ImpuestoController.getOne)
  .put("/impuesto/actualizar-insertar/:cod_impuesto", ImpuestoController.save)
  .delete("/impuesto/eliminar/:cod_impuesto", ImpuestoController.delete)
  //****ARTICULO****
  .get("/articulo/getall", ArticuloController.getAll)
  .get("/articulo/getone/:cod_articulo", ArticuloController.getOne)
  .put("/articulo/actualizar-insertar/:cod_articulo", ArticuloController.save)
  .delete("/articulo/eliminar/:cod_articulo", ArticuloController.delete)
  //****CENTRO COSTO****
  .get("/centro_costo/getall", CentroCostoController.getAll)
  .get("/centro_costo/getone/:cod_centro_costo", CentroCostoController.getOne)
  .put(
    "/centro_costo/actualizar-insertar/:cod_centro_costo",
    CentroCostoController.save
  )
  .delete(
    "/centro_costo/eliminar/:cod_centro_costo",
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
  .get("/metodo_pago/getone/:cod_metodo_pago", MetodoPagoController.getOne)
  .put(
    "/metodo_pago/actualizar-insertar/:cod_metodo_pago",
    MetodoPagoController.save
  )
  .delete("/metodo_pago/eliminar/:cod_metodo_pago", MetodoPagoController.delete)
  //****MODO PEDIDO****
  .get("/modo_pedido/getall", ModoPedidoController.getAll)
  .get("/modo_pedido/getone/:cod_modo_pedido", ModoPedidoController.getOne)
  .put(
    "/modo_pedido/actualizar-insertar/:cod_modo_pedido",
    ModoPedidoController.save
  )
  .delete("/modo_pedido/eliminar/:cod_modo_pedido", ModoPedidoController.delete)
  //****POS****
  .get("/pos/getall", PosController.getAll)
  .get("/pos/getone/:cod_pos", PosController.getOne)
  .put("/pos/actualizar-insertar/:cod_pos", PosController.save)
  .delete("/pos/eliminar/:cod_pos", PosController.delete)
  //****PROMO LISTA****
  .get("/promo_lista/getall", PromoListaController.getAll)
  .get("/promo_lista/getone/:id_promo", PromoListaController.getOne)
  .put("/promo_lista/actualizar-insertar/:id_promo", PromoListaController.save)
  .delete("/promo_lista/eliminar/:id_promo", PromoListaController.delete)
  //****PROMO****
  .get("/promo/getall", PromoController.getAll)
  .get("/promo/getone/:cod_promo", PromoController.getOne)
  .put("/promo/actualizar-insertar/:cod_promo", PromoController.save)
  .delete("/promo/eliminar/:cod_promo", PromoController.delete)
  //****SOCIO NEGOCIO****
  .get("/socio_negocio/getall", SocioNegocioController.getAll)
  .get(
    "/socio_negocio/getone/:cod_socio_negocio",
    SocioNegocioController.getOne
  )
  .put(
    "/socio_negocio/actualizar-insertar/:cod_socio_negocio",
    SocioNegocioController.save
  )
  .delete(
    "/socio_negocio/eliminar/:cod_socio_negocio",
    SocioNegocioController.delete
  )
  //****SUCURSAL****
  .get("/sucursal/getall", SucursalController.getAll)
  .get("/sucursal/getone/:cod_sucursal", SucursalController.getOne)
  .put("/sucursal/actualizar-insertar/:cod_sucursal", SucursalController.save)
  .delete("/sucursal/eliminar/:cod_sucursal", SucursalController.delete)
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
  .get("/mapa/getone/:cod_mapa", MapaController.getOne)
  .put("/mapa/actualizar-insertar/:cod_mapa", MapaController.save)
  .delete("/mapa/eliminar/:cod_mapa", MapaController.delete)
  //****MESA****
  .get("/mesa/getall", MesaController.getAll)
  .get("/mesa/getone/:cod_mesa", MesaController.getOne)
  .put("/mesa/actualizar-insertar/:cod_mesa", MesaController.save)
  .delete("/mesa/eliminar/:cod_mesa", MesaController.delete)
  //****LISTA MATERIALES****
  .get("/lista_materiales/getall", ListaMaterialesController.getAll)
  .get(
    "/lista_materiales/getone/:id_articulo_padre",
    ListaMaterialesController.getOne
  )
  .put(
    "/lista_materiales/actualizar-insertar/:id_articulo_padre",
    ListaMaterialesController.save
  )
  .delete(
    "/lista_materiales/eliminar/:id_articulo_padre",
    ListaMaterialesController.delete
  )

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
