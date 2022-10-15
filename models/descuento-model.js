"use strict";

var conn = require("./db-connection"),
  DescuentoModel = () => {};

DescuentoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_descuento", cb);

DescuentoModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_descuento WHERE id_descuento = $1", [id], cb);

DescuentoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_descuento WHERE id_descuento = $1",
    [data.id_descuento],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_descuento_update ($1,$2,$3,$4,$5,$6)",
              [
                data.id_descuento,
                data.descripcion,
                data.porcentaje,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo,
              ],
              cb
            )
          : conn.query(
              "call prc_descuento_insert ($1,$2,$3,$4,$5,$6)",
              [
                data.id_descuento,
                data.descripcion,
                data.porcentaje,
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

DescuentoModel.delete = (id, cb) =>
  conn.query("call prc_descuento_delete ($1)", [id], cb);

module.exports = DescuentoModel;
