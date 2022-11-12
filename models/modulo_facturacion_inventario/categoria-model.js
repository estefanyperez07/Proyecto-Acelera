"use strict";

var conn = require("../db-connection"),
  CategoriaModel = () => {};

CategoriaModel.getAll = (cb) => conn.query("SELECT * FROM tbl_categoria", cb);

CategoriaModel.getAllActive = (cb) =>
  conn.query("SELECT * FROM tbl_categoria where activo = '1'", cb);

CategoriaModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM tbl_categoria WHERE cod_categoria = $1", [cod], cb);

CategoriaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_categoria WHERE id_categoria = $1 and cod_categoria = $2",
    [data.id_categoria, data.cod_categoria],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_categoria_update ($1,$2,$3,$4,$5,$6)",
              [
                data.id_categoria,
                data.cod_categoria,
                data.descripcion,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_categoria_insert ($1,$2,$3,$4,$5)",
              [
                data.cod_categoria,
                data.descripcion,
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

CategoriaModel.delete = (id, cb) =>
  conn.query("call prc_categoria_delete ($1)", [id], cb);

module.exports = CategoriaModel;
