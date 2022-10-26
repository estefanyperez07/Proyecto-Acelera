"use strict";

var conn = require("./db-connection"),
  MesaModel = () => {};

MesaModel.getAll = (cb) => conn.query("SELECT * FROM tbl_mesas", cb);

MesaModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_mesas WHERE id_mesa = $1", [id], cb);

MesaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_mesas WHERE id_mesa = $1",
    [data.id_mesa],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_mesa_update ($1,$2,$3,$4,$5,$6,$7,$8)",
              [
                data.id_mesa,
                data.id_mapa,
                data.descripcion,
                data.pos_x,
                data.pos_y,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo
              ],
              cb
            )
          : conn.query(
              "call prc_mesa_insert ($1,$2,$3,$4,$5,$6,$7,$8)",
              [
                data.id_mesa,
                data.id_mapa,
                data.descripcion,
                data.pos_x,
                data.pos_y,
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

MesaModel.delete = (id, cb) =>
  conn.query("call prc_mesa_delete ($1)", [id], cb);

module.exports = MesaModel;
