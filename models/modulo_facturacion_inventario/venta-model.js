"use strict";

var conn = require("../db-connection"),
  VentaModel = () => {};

VentaModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_sucursal_getall()", cb);

VentaModel.secuencia_enc_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_enc_getone()", cb);

VentaModel.secuencia_det_getone = (cb) =>
  conn.query("SELECT public.ft_secuencia_det_getone()", cb);

VentaModel.post = (data, cb) => {
  conn.query("select public.fcn_venta_enca_insert($1)", [data], cb);
};

VentaModel.delete = (venta, cb) =>
  conn.query(
    "call public.prc_venta_delete($1,$2)",
    [venta.secuencia_enc, venta.detalle.secuencia_det],
    cb
  );

module.exports = VentaModel;
