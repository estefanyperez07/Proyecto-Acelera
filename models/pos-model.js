"use strict";

var conn = require("./db-connection"),
  PosModel = () => {};

PosModel.getAll = (cb) => conn.query("SELECT * FROM tbl_pos", cb);

PosModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_pos WHERE id_pos = $1", [id], cb);

PosModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_pos WHERE id_pos = $1",
    [data.id_pos],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_pos_update ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_pos,
                data.descripcion,
                data.id_sucursal,
                data.id_correlativo,
                data.modificado_por,
                data.fecha_modificacion,
                activo

              ],
              cb
            )
          : conn.query(
              "call prc_pos_insert ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_pos,
                data.descripcion,
                data.id_sucursal,
                data.id_correlativo,
                data.creado_por,
                data.fecha_creacion,
                activo
              ],
              cb
            );
      }
    }
  );
};

PosModel.delete = (id, cb) =>
  conn.query("call prc_pos_delete ($1)", [id], cb);

module.exports = PosModel;
