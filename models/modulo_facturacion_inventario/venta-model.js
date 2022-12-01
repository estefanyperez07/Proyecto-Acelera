"use strict";

var conn = require("../db-connection"),
  VentaModel = () => {};

VentaModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_sucursal_getall()", cb);

VentaModel.facturasPorFecha = (fechas, cb) =>
  conn.query(
    "SELECT * FROM public.ft_facturas_por_fecha($1,$2)",
    [fechas.fecha_inicial, fechas.fecha_final],
    cb
  );

VentaModel.getCorte = (datos, cb) =>
  conn.query(
    "SELECT * FROM public.ft_json_arqueo($1,$2,$3,$4)",
    [datos.id_sucursal, datos.fecha, datos.id_usuario, datos.id_pos],
    cb
  );

VentaModel.getReporteVentas = (datos, cb) =>
  conn.query(
    "SELECT * FROM public.ft_venta_remumen($1,$2,$3)",
    [datos.id_sucursal, datos.fecha_inicial, datos.fecha_final],
    cb
  );

VentaModel.getReporteVentasPorProducto = (datos, cb) =>
  conn.query(
    "SELECT * FROM public.ft_venta_por_articulos($1,$2,$3)",
    [datos.id_sucursal, datos.fecha_inicial, datos.fecha_final],
    cb
  );

VentaModel.getReporteVentasUsuario = (datos, cb) =>
  conn.query(
    "SELECT * FROM public.ft_venta_remumen_usuario($1,$2,$3,$4)",
    [
      datos.id_sucursal,
      datos.fecha_inicial,
      datos.fecha_final,
      datos.id_usuario,
    ],
    cb
  );

VentaModel.detallePorEncabezado = (sec, cb) =>
  conn.query("SELECT * FROM public.ft_json_venta($1)", [sec], cb);

VentaModel.secuencia_enc_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_enc_getone()", cb);

VentaModel.secuencia_det_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_det_getone()", cb);

VentaModel.post = (data, cb) => {
  conn.query("select public.fcn_venta_enca_insert($1)", [data], cb);
};

VentaModel.anular = (enc, cb) =>
  conn.query(
    "update public.tbl_venta_encabezado set estado='2' where secuencia_enc=$1",
    [enc],
    cb
  );

module.exports = VentaModel;
