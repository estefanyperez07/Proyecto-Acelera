"use strict";

var conn = require("./db-connection"),
  CategoriaModel = () => {};

CategoriaModel.getAll = (cb) => conn.query("SELECT * FROM tbl_categoria", cb);

CategoriaModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_categoria WHERE id_categoria = $1", [id], cb);

CategoriaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_categoria WHERE id_categoria = $1",
    [data.id_categoria],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_categoria_update ($1,$2,$3,$4,$5)",
              [
                data.id_categoria,
                data.descripcion,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo,
              ],
              cb
            )
          : conn.query(
              "call prc_categoria_insert ($1,$2,$3,$4,$5)",
              [
                data.id_categoria,
                data.descripcion,
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

CategoriaModel.delete = (id, cb) =>
  conn.query("call prc_categoria_delete ($1)", [id], cb);

module.exports = CategoriaModel;
