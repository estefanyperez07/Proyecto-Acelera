"use strict";

var conn = require("./db-connection"),
  MetodoPagoModel = () => {};

MetodoPagoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_metodo_pago", cb);

MetodoPagoModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_metodo_pago WHERE id_metodo_pago = $1", [id], cb);

MetodoPagoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_metodo_pago WHERE id_metodo_pago = $1",
    [data.id_metodo_pago],
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
                data.id_metodo_pago,
                data.descripcion,
                data.tipo,
                data.cuenta_contable,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo

              ],
              cb
            )
          : conn.query(
              "call prc_metodo_pago_insert ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_metodo_pago,
                data.descripcion,
                data.tipo,
                data.cuenta_contable,
                data.creado_por,
                data.fecha_creacion,
                data.activo
              ],
              cb
            );
      }
    }
  );
};

MetodoPagoModel.delete = (id, cb) =>
  conn.query("call prc_metodo_pago_delete ($1)", [id], cb);

module.exports = MetodoPagoModel;
