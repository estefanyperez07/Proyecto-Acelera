"use strict";

var conn = require("../db-connection"),
  MovimientosModel = () => {};

MovimientosModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_sucursal_getall()", cb);

MovimientosModel.comprasPorFecha = (fechas, cb) =>
  conn.query(
    "SELECT * FROM public.ft_compras_por_fecha($1,$2)",
    [fechas.fecha_inicial, fechas.fecha_final],
    cb
  );

MovimientosModel.detallePorEncabezado = (sec, cb) =>
  conn.query("SELECT * FROM public.ft_json_compras($1)", [sec], cb);

MovimientosModel.anularPorEncabezado = (sec, cb) =>
  conn.query("SELECT * public.ft_json_compras_asiento_anular($1)", [sec], cb);

MovimientosModel.jsonAsientoCompras = (sec, cb) =>
  conn.query("SELECT * FROM public.ft_json_compras_asiento($1)", [sec], cb);

MovimientosModel.secuencia_enc_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_enc_compras_getone()", cb);

MovimientosModel.secuencia_det_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_det_compras_getone()", cb);

MovimientosModel.post = (data, cb) => {
  conn.query("select public.fcn_compras_enca_insert($1)", [data], cb);
};

MovimientosModel.anular = (enc, cb) =>
  conn.query(
    "update public.tbl_movimiento_enc set estado='2' where secuencia_enc=$1",
    [enc],
    cb
  );

module.exports = MovimientosModel;
