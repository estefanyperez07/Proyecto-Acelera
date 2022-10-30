"use strict";

var conn = require("../db-connection"),
  ImpuestoModel = () => {};

ImpuestoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_impuesto", cb);

ImpuestoModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM tbl_impuesto WHERE cod_impuesto = $1", [cod], cb);

ImpuestoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_impuesto WHERE cod_impuesto = $1",
    [data.cod_impuesto],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);
      console.log(data.cod_impuesto);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_impuesto_update ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.cod_impuesto,
                data.descripcion,
                data.porcentaje,
                data.tipo,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_impuesto_insert ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.cod_impuesto,
                data.descripcion,
                data.porcentaje,
                data.tipo,
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

ImpuestoModel.delete = (cod, cb) =>
  conn.query("call prc_impuesto_delete ($1)", [cod], cb);

module.exports = ImpuestoModel;
