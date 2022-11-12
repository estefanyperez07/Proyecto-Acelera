"use strict";

var conn = require("../db-connection"),
  MetodoPagoModel = () => {};

MetodoPagoModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_metodo_pago", cb);

MetodoPagoModel.getAllActive = (cb) =>
  conn.query("SELECT * FROM tbl_metodo_pago where activo = '1'", cb);

MetodoPagoModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM tbl_metodo_pago WHERE cod_metodo_pago = $1",
    [cod],
    cb
  );

MetodoPagoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_metodo_pago WHERE cod_metodo_pago = $1",
    [data.cod_metodo_pago],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_metodo_pago_update ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.cod_metodo_pago,
                data.descripcion,
                data.tipo,
                data.cuenta_contable,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_metodo_pago_insert ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.cod_metodo_pago,
                data.descripcion,
                data.tipo,
                data.cuenta_contable,
                data.activo,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

MetodoPagoModel.delete = (cod, cb) =>
  conn.query("call prc_metodo_pago_delete ($1)", [cod], cb);

module.exports = MetodoPagoModel;
