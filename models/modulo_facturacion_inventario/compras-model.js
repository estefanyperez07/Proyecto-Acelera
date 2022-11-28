"use strict";

var conn = require("../db-connection"),
  ComprasModel = () => {};

ComprasModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_sucursal_getall()", cb);

ComprasModel.comprasPorFecha = (fecha, cb) =>
  conn.query("SELECT * FROM public.ft_compras_por_fecha($1)", [fecha], cb);

ComprasModel.detallePorEncabezado = (sec, cb) =>
  conn.query("SELECT * FROM public.ft_json_compras($1)", [sec], cb);

ComprasModel.jsonAsientoCompras = (sec, cb) =>
  conn.query("SELECT * FROM public.ft_json_compras_asiento($1)", [sec], cb);

ComprasModel.secuencia_enc_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_enc_compras_getone()", cb);

ComprasModel.secuencia_det_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_det_compras_getone()", cb);

ComprasModel.post = (data, cb) => {
  conn.query("select public.fcn_compras_enca_insert($1)", [data], cb);
};

ComprasModel.delete = (venta, cb) =>
  conn.query(
    "call public.prc_comrpas_delete($1,$2)",
    [venta.secuencia_enc, venta.detalle.secuencia_det],
    cb
  );

module.exports = ComprasModel;
