"use strict";

var conn = require("./db-connection"),
  ImpuestoModel = () => {};

ImpuestoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_impuesto", cb);

ImpuestoModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_impuesto WHERE id_impuesto = $1", [id], cb);

ImpuestoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_impuesto WHERE id_impuesto = $1",
    [data.id_descuento],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_impuesto_update ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_impuesto,
                data.descripcion,
                data.porcentaje,
                data.tipo,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo,
              ],
              cb
            )
          : conn.query(
              "call prc_impuesto_insert ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_impuesto,
                data.descripcion,
                data.porcentaje,
                data.tipo,
                data.creado_por,
                data.fecha_creacion,
                data.activo,
              ],
              cb
            );
      }
    }
  );
};

ImpuestoModel.delete = (id, cb) =>
  conn.query("call prc_impuesto_delete ($1)", [id], cb);

module.exports = ImpuestoModel;
