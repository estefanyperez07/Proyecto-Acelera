"use strict";

var conn = require("../db-connection"),
  CategoriaContModel = () => {};

CategoriaContModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_informe_financiero()", cb);

CategoriaContModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_categoria WHERE id_categoria = $1", [cod], cb);

CategoriaContModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_categoria WHERE id_categoria = $1",
    [data.id_categoria],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call ft_categoria_update ($1,$2)", //FALTA
              [
                data.id_categoria,
                data.nombre_categoria,
              ],
              cb
            )
          : conn.query(
              "call prc_categoria_insert ($1)",
              [
                data.nombre_categoria,
              ],
              cb
            );
      }
    }
  );
};

CategoriaContModel.delete = (id, cb) =>
  conn.query("call prc_categoria_delete ($1)", [id], cb);

module.exports = CategoriaContModel;