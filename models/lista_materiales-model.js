"use strict";

var conn = require("./db-connection"),
  ListaMaterialesModel = () => {};

ListaMaterialesModel.getAll = (cb) => conn.query("SELECT * FROM tbl_lista_materiales", cb);

ListaMaterialesModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_lista_materiales WHERE id_articulo_padre = $1", [id], cb);

ListaMaterialesModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_lista_materiales WHERE id_articulo_padre = $1",
    [data.id_articulo_padre],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_lista_materiales_update ($1,$2,$3,$4,$5,$6)",
              [
                data.id_articulo_padre,
                data.id_articulo_hijo,
                data.cantidad,
                data.comentario,
                data.modificado_por,
                data.fecha_modificacion
              ],
              cb
            )
          : conn.query(
              "call prc_lista_materiales_insert ($1,$2,$3,$4,$5)",
              [
                data.id_articulo_padre,
                data.id_articulo_hijo,
                data.cantidad,
                data.comentario,
                data.creado_por,
                data.fecha_creacion
              ],
              cb
            );
      }
    }
  );
};

ListaMaterialesModel.delete = (id, cb) =>
  conn.query("call prc_lista_materiales_delete ($1)", [id], cb);

module.exports = ListaMaterialesModel;
