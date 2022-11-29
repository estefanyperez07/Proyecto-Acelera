"use strict";

var CategoriaController = require("../controllers/modulo_facturacion_inventario/categoria-controller"),
  DescuentoController = require("../controllers/modulo_facturacion_inventario/descuento-controller"),
  ImpuestoController = require("../controllers/modulo_facturacion_inventario/impuesto-controller"),
  ArticuloController = require("../controllers/modulo_facturacion_inventario/articulo-controller"),
  CentroCostoController = require("../controllers/modulo_facturacion_inventario/centro_costo-controller"),
  CorrelativoController = require("../controllers/modulo_facturacion_inventario/correlativo-controller"),
  MetodoPagoController = require("../controllers/modulo_facturacion_inventario/metodo_pago-controller"),
  ModoPedidoController = require("../controllers/modulo_facturacion_inventario/modo_pedido-controller"),
  PosController = require("../controllers/modulo_facturacion_inventario/pos-controller"),
  PromoListaController = require("../controllers/promo_lista-controller"),
  PromoController = require("../controllers/promo-controller"),
  SocioNegocioController = require("../controllers/modulo_facturacion_inventario/socio_negocio-controller"),
  SucursalController = require("../controllers/modulo_facturacion_inventario/sucursal-controller"),
  EmpresaController = require("../controllers/modulo_facturacion_inventario/empresa-controller"),
  UnidadMedidaController = require("../controllers/modulo_facturacion_inventario/unidad_medida-controller"),
  MapaController = require("../controllers/mapa-controller"),
  MesaController = require("../controllers/mesa-controller"),
  ListaMaterialesController = require("../controllers/modulo_facturacion_inventario/lista_materiales-controller"),
  BitacoraController = require("../controllers/modulo_facturacion_inventario/bitacora-controller"),
  VentaController = require("../controllers/modulo_facturacion_inventario/venta-controller"),
  ComprasController = require("../controllers/modulo_facturacion_inventario/compras-controller"),
  //⮊⮊⮊⮊ SEGURIDAD SEGURIDAD SEGURIDAD ⮈⮈⮈⮈ 🖐
  UsuarioController = require("../controllers/modulo_seguridad/registro-controller"),
  EstadoUserController = require("../controllers/modulo_seguridad/estado-controller"),
  PreguntasController = require("../controllers/modulo_seguridad/preguntas-controller"),
  PreguntasUsuarioController = require("../controllers/modulo_seguridad/preg_usuario-controller"),
  RolController = require("../controllers/modulo_seguridad/rol-controller"),
  PermisosController = require("../controllers/modulo_seguridad/permisos-controller"),
  ParametroController = require("../controllers/modulo_seguridad/parametros-controller"),
  ObjetoController = require("../controllers/modulo_seguridad/objeto-controller"),
  LoginController = require("../controllers/modulo_seguridad/login-controller"),
  LogsController = require("../controllers/modulo_seguridad/logs-controller"),
  //⮊⮊⮊⮊ CONTABILIDAD ⮈⮈⮈⮈ 🖐
  SubcuentaController = require("../controllers/modulo_contabilidad/subcuenta-controller"),
  EstadoController = require("../controllers/modulo_contabilidad/estado-controller"),
  LibroDetalleController = require("../controllers/modulo_contabilidad/librodiariodetalle-controller"),
  LibroEncabezadoController = require("../controllers/modulo_contabilidad/librodiarioencabezado-controller"),
  PeriodoContableController = require("../controllers/modulo_contabilidad/periodo-controller"),
  LibroMayorController = require("../controllers/modulo_contabilidad/libromayor-controller"),
  CategoriaContController = require("../controllers/modulo_contabilidad/categoriacon-controller"),
  CatalogoController = require("../controllers/modulo_contabilidad/catalogo_cuentas-controller"),
  DestinoCuentaController = require("../controllers/modulo_contabilidad/destino_cuenta-controller"),
  InformeFinancieroController = require("../controllers/modulo_contabilidad/informe_financiero-controller"),
  BalanceController = require("../controllers/modulo_contabilidad/balance-controller"),
  IGController = require("../controllers/modulo_contabilidad/ig-controller"),
  EstadoResultadoController = require("../controllers/modulo_contabilidad/estado_resultado-controller"),
  ActivosController = require("../controllers/modulo_contabilidad/activos-controller"),
  PasivosController = require("../controllers/modulo_contabilidad/pasivos-controller"),
  PatrimoniosController = require("../controllers/modulo_contabilidad/patrimonios-controller"),
  IngresosController = require("../controllers/modulo_contabilidad/ingresos-controller"),
  express = require("express"),
  router = express.Router();

router
  //--------------------------------COMENTARIOS DE SEGURIDAD -----------------
  /*.get("/", (req, res) => {
    res.status(200).json({
      ok: true,
      object: "API PROYECTO SEGURIDAD",
      message: "API corriendo correctamente",
    });
  })*/

  // CONFIG OPTIONS
  .options("/", (req, res) => {
    res.set("x-options", "PROYECTO SEGURIDAD OPTIONS!!!");
    res.status(204).send();
  })

  // CONFIG HEAD
  .head("/", (req, res) => {
    res.set("x-headers", "PROYECTO SEGURIDAD HEAD!!!");
    res.status(200).send();
  })

  .use("/documentation", express.static("public"), (req, res) => {
    res.set("Content-Type", "text/html");
    // res.sendFile(path.join(__dirname, '/public/index.html'))
    res.sendFile(`${__dirname} '/public/index.html`);
  })
  //--------------------------------COMENTARIOS DE SEGURIDAD -----------------

  //.get('/agregar', CategoriaController.addForm)
  //.post('/', CategoriaController.save)
  //****CATEGORIAS****
  .get("/categoria/getall", CategoriaController.getAll)
  .get("/categoria/getall_active", CategoriaController.getAllActive)
  .get("/categoria/getone/:cod_categoria", CategoriaController.getOne)
  .put(
    "/categoria/actualizar-insertar/:cod_categoria",
    CategoriaController.save
  )
  .delete("/categoria/eliminar/:cod_categoria", CategoriaController.delete)
  //****DESCUENTOS****
  .get("/descuento/getall", DescuentoController.getAll)
  .get("/descuento/getall_active", DescuentoController.getAllActive)
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
  .post(
    "/articulo/movimientosporarticulo/",
    ArticuloController.getMovimientosPorArticulo
  )
  .get("/articulo/getallporbodega", ArticuloController.getAllPorBodega)
  .get("/articulo/getallactive", ArticuloController.getAllActive)
  .get("/articulo/getallactiveinv", ArticuloController.getAllActiveInv)
  .get(
    "/articulo/getallbycategoria/:id_categoria",
    ArticuloController.getAllByCategoria
  )
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
  .get("/metodo_pago/getall_active", MetodoPagoController.getAllActive)
  .get("/metodo_pago/getone/:cod_metodo_pago", MetodoPagoController.getOne)
  .put(
    "/metodo_pago/actualizar-insertar/:cod_metodo_pago",
    MetodoPagoController.save
  )
  .delete("/metodo_pago/eliminar/:cod_metodo_pago", MetodoPagoController.delete)
  //****MODO PEDIDO****
  .get("/modo_pedido/getall", ModoPedidoController.getAll)
  .get("/modo_pedido/getall_active", ModoPedidoController.getAllActive)
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
  .get("/socio_negocio/getallclientes", SocioNegocioController.getAllClientes)
  .get(
    "/socio_negocio/getallproveedores",
    SocioNegocioController.getAllProveedores
  )
  .get(
    "/socio_negocio/getone/:cod_socio_negocio",
    SocioNegocioController.getOne
  )
  .get("/socio_negocio/getonertn/:rtn", SocioNegocioController.getOneRTN)
  .put(
    "/socio_negocio/actualizar-insertar/:cod_socio_negocio",
    SocioNegocioController.save
  )
  .put(
    "/socio_negocio/actualizar-insertar_por_rtn/",
    SocioNegocioController.savePorRTNNombre
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

  //****EMPRESA****
  .get("/empresa/getone/", EmpresaController.getOne)
  .put("/empresa/actualizar-insertar/:id_empresa", EmpresaController.save)

  //****UNIDAD MEDIDA****
  .get("/unidad_medida/getall", UnidadMedidaController.getAll)

  .get(
    "/unidad_medida/getone/:cod_unidad_medida",
    UnidadMedidaController.getOne
  )
  .put(
    "/unidad_medida/actualizar-insertar/:cod_unidad_medida",
    UnidadMedidaController.save
  )
  .delete(
    "/unidad_medida/eliminar/:cod_unidad_medida",
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
  .post("/lista_materiales/getone", ListaMaterialesController.getOne)
  .get(
    "/lista_materiales/padregetone/:id_articulo_padre",
    ListaMaterialesController.padreGetAll
  )
  .put("/lista_materiales/actualizar-insertar/", ListaMaterialesController.save)
  .delete("/lista_materiales/eliminar/", ListaMaterialesController.delete)

  //*****BITACORA******/
  .get("/bitacora/getallbydate", BitacoraController.getAllByDate)
  .post("/bitacora/insertar/", BitacoraController.save)
  .delete("/bitacora/eliminar/", BitacoraController.delete)

  //******VENTA*******/
  .post("/venta/insertar/", VentaController.post)
  .get("/venta/secuencia_enc_getone/", VentaController.secuencia_enc_getone)
  .get("/venta/secuencia_det_getone/", VentaController.secuencia_det_getone)
  .post("/venta/venta_por_fecha/", VentaController.facturasPorFecha)
  .post("/venta/getcorte/", VentaController.getCorte)
  .get(
    "/venta/detalle_por_encabezado/:enc",
    VentaController.detallePorEncabezado
  )

  //******COMPRAS*******/
  .post("/compras/insertar/", ComprasController.post)
  .get("/compras/secuencia_enc_getone/", ComprasController.secuencia_enc_getone)
  .get("/compras/secuencia_det_getone/", ComprasController.secuencia_det_getone)
  .get("/compras/jsonasiento/:enc", ComprasController.jsonAsientoCompras)
  .post("/compras/compras_por_fecha/", ComprasController.comprasPorFecha)
  .get(
    "/compras/detalle_por_encabezado/:enc",
    ComprasController.detallePorEncabezado
  )

  //⮊⮊⮊⮊ SEGURIDAD SEGURIDAD SEGURIDAD ⮈⮈⮈⮈ 🖐
  //Login
  .post("/login", LoginController.login)
  .post("/reset", LoginController.resetPassUser)
  .post("/validateUser", LoginController.validateUser)
  .post("/validatecurrentpassword", LoginController.validatecurrentpassword)
  .post("/changePass", LoginController.changePassUser)
  //bitacoras
  .get("/logs/getall", LogsController.getAll)
  .post("/logs/save", LogsController.save)
  //Registro
  .get("/registro/getall", UsuarioController.getAll)
  .get("/getById/:id_usuario", UsuarioController.getOne)
  .put("/ms_registro/update/:id_usuario", UsuarioController.edit)
  .delete("/ms_registro/eliminar/:id_usuario", UsuarioController.delete)
  .post("/ms_registro/autoregistro", UsuarioController.autoregistro)
  .post("/ms_registro/createUser", UsuarioController.save)
  .post("/ms_registro/validateUserState", UsuarioController.validateUserState)
  .post("/ms_registro/updateUserState", UsuarioController.updateUserState)
  //Estado
  .get("/ms_estado/getall", EstadoUserController.getAll)
  .get("/ms_estado/getone/:id", EstadoUserController.getOne)
  .put("/ms_estado/actualizar-insertar/:id", EstadoUserController.save)
  .delete("/ms_estado/eliminar/:id", EstadoUserController.delete)
  //Preguntas
  .get("/ms_pregunta/getall", PreguntasController.getAll)
  .get("/ms_pregunta/getone/:id_pregunta", PreguntasController.getOne)
  .put(
    "/ms_pregunta/actualizar-insertar/:id_pregunta",
    PreguntasController.save
  )
  .put("/ms_pregunta/actualizar/:id_pregunta", PreguntasController.actualizar)
  .delete("/ms_pregunta/eliminar/:id_pregunta", PreguntasController.delete)
  //Preguntas Usuario
  .get("/ms_pregunta_usuario/getall", PreguntasUsuarioController.getAll)
  .get(
    "/ms_pregunta_usuario/getone/:id_preguntas_usuario",
    PreguntasUsuarioController.getOne
  )
  .post("/ms_pregunta_usuario/save", PreguntasUsuarioController.save)
  .put(
    "/ms_pregunta_usuario/actualizar/:id_preguntas_usuario",
    PreguntasUsuarioController.update
  )
  .delete(
    "/ms_pregunta_usuario/eliminar/:id_preguntas_usuario",
    PreguntasUsuarioController.delete
  )
  //Rol
  .get("/ms_rol/getall", RolController.getAll)
  .get("/ms_rol/getone/:rol", RolController.getOne)
  .put("/ms_rol/actualizar-insertar/:id_rol", RolController.save)
  .delete("/ms_rol/eliminar/:id_rol", RolController.delete)
  .get("/ms_rol/traerrol", RolController.traerroles)
  //Permisos
  .get("/ms_permisos/getall", PermisosController.getAll)
  .get(
    "/ms_permisos/getallporusuario/:usuario",
    PermisosController.getAllPorUsuario
  )
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
  .get("/ms_objetos/getone/:objeto", ObjetoController.getOne)
  .put("/ms_objetos/actualizar-insertar/:id_objeto", ObjetoController.save)
  .delete("/ms_objetos/eliminar/:id_objeto", ObjetoController.delete)

  //⮊⮊⮊⮊ CONTABILIDAD ⮈⮈⮈⮈ 🖐
  //SUBCUENTA
  .get("/mc_subcuenta/getall", SubcuentaController.getAll)
  .get("/mc_subcuenta/getone/:nombre_subcuenta", SubcuentaController.getOne)
  .put(
    "/mc_subcuenta/actualizar-insertar/:id_subcuenta",
    SubcuentaController.save
  )
  .delete("/mc_subcuenta/eliminar/:id_subcuenta", SubcuentaController.delete)
  //ESTADO
  .get("/mc_estado/getall", EstadoController.getAll)
  .get("/mc_estado/getone/:tipo_estado", EstadoController.getOne)
  .put("/mc_estado/actualizar-insertar/:id_estado", EstadoController.save)
  .delete("/mc_estado/eliminar/:id_estado", EstadoController.delete)
  //LIBRO DIARIO DETALLE
  .get("/mc_librodetalle/getall", LibroDetalleController.getAll)
  .get(
    "/mc_librodetalle/getDetPorI/:id_libro_diario_enca",
    LibroDetalleController.getOne
  )
  .put(
    "/mc_librodetalle/actualizar-insertar/:id_libro_diario_deta",
    LibroDetalleController.save
  )
  .delete(
    "/mc_librodetalle/eliminar/:id_libro_diario_deta",
    LibroDetalleController.delete
  )
  //LIBRO DIARIO ENCABEZADO
  .get(
    "/mc_libroencabezado/getallPorPeriodo/:id_periodo_contable",
    LibroEncabezadoController.getAllPorPeriodo
  )
  .get(
    "/mc_libroencabezado/getone/:id_libro_diario_enca",
    LibroEncabezadoController.getOne
  )
  .put(
    "/mc_libroencabezado/actualizar-insertar/:id_libro_diario_enca",
    LibroEncabezadoController.save
  )
  .delete(
    "/mc_libroencabezado/eliminar/:id_libro_diario_enca",
    LibroEncabezadoController.delete
  )
  .post("/mc_libroencabezado/insertar", LibroEncabezadoController.post)
  .post("/mc_libroencabezado/update", LibroEncabezadoController.update)
  //PERIODO CONTABLE
  .get("/mc_periodo/getall", PeriodoContableController.getAll)
  .get(
    "/mc_periodo/getone/:id_periodo_contable",
    PeriodoContableController.getOne
  )
  .put(
    "/mc_periodo/actualizar-insertar/:id_periodo_contable",
    PeriodoContableController.save
  )
  .delete(
    "/mc_periodo/eliminar/:id_periodo_contable",
    PeriodoContableController.delete
  )
  //LIBRO MAYOR
  .get("/mc_libromayor/getall", LibroMayorController.getAll)
  .get("/mc_libromayor/getone/:id_libro_mayor", LibroMayorController.getOne)
  .put(
    "/mc_libromayor/actualizar-insertar/:id_libro_mayor",
    LibroMayorController.save
  )
  .put(
    "/mc_libromayor/actualizar-insertar/:id_libro_mayor",
    LibroMayorController.save
  )
  .post("/mc_libromayor/mayorizar/", LibroMayorController.mayorizar)
  .delete(
    "/mc_libromayor/eliminar/:id_libro_mayor",
    LibroMayorController.delete
  )
  //CATEGORIA CONTABLE
  .get("/mc_categoriacont/getall", CategoriaContController.getAll)
  .get(
    "/mc_categoriacont/getone/:nombre_categoria",
    CategoriaContController.getOne
  )
  .put(
    "/mc_categoriacont/actualizar-insertar/:id_categoria",
    CategoriaContController.save
  )
  .delete(
    "/mc_categoriacont/eliminar/:id_categoria",
    CategoriaContController.delete
  )
  //CATALOGO DE CUENTAS
  .get("/mc_catalogo/getall", CatalogoController.getAll)
  .get("/mc_catalogo/getone/:codigo_cuenta", CatalogoController.getOne)
  .put("/mc_catalogo/actualizar-insertar/:id_cuenta", CatalogoController.save)
  .delete("/mc_catalogo/eliminar/:id_cuenta", CatalogoController.delete)
  //DESTINO DE CUENTAS
  .get("/mc_destino/getall", DestinoCuentaController.getAll)
  .get("/mc_destino/getone/:id_destino_cuenta", DestinoCuentaController.getOne)
  .put(
    "/mc_destino/actualizar-insertar/:id_destino_cuenta",
    DestinoCuentaController.save
  )
  .delete(
    "/mc_destino/eliminar/:id_destino_cuenta",
    DestinoCuentaController.delete
  )
  //INFORME FINANCIERO
  .get("/mc_informefinanciero/getall", InformeFinancieroController.getAll)
  .get(
    "/mc_informefinanciero/getone/:descripcion",
    InformeFinancieroController.getOne
  )
  .put(
    "/mc_informefinanciero/actualizar-insertar/:id_informe_financiero",
    InformeFinancieroController.save
  )
  .delete(
    "/mc_informefinanciero/eliminar/:id_informe_financiero",
    InformeFinancieroController.delete
  )
  //BALANCE GENERAL
  .get("/mc_balance/getall", BalanceController.getAll)
  //INGRESOS Y EGRESOS
  .get("/mc_ingresos/getall", IGController.getAll)
  //ESTADO DE RESULTADO
  .get("/mc_estado_resultado/getall", EstadoResultadoController.getAll)
  //ACTIVOS
  .get("/mc_activos/getall", ActivosController.getAll)
  //PASIVOS
  .get("/mc_pasivos/getall", PasivosController.getAll)
  //PATRIMONIOS
  .get("/mc_patrimonios/getall", PatrimoniosController.getAll)
  //INGRESOS
  .get("/mc_ingresos/getall", IngresosController.getAll)

  .use(CategoriaController.error404);

module.exports = router;
