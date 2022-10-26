"use strict";

var conn = require("./db-connection"),
  MapaModel = () => {};

MapaModel.getAll = (cb) => conn.query("SELECT * FROM tbl_mapa", cb);

MapaModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_mapa WHERE id_mapa = $1", [id], cb);

MapaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_mapa WHERE id_mapa = $1",
    [data.id_mapa],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_mapa_update ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_mapa,
                data.descripcion,
                data.res_x,
                data.res_y,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo
              ],
              cb
            )
          : conn.query(
              "call prc_mapa_insert ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_mapa,
                data.descripcion,
                data.res_x,
                data.res_y,
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

MapaModel.delete = (id, cb) =>
  conn.query("call prc_mapa_delete ($1)", [id], cb);

module.exports = MapaModel;
