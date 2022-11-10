"use strict";

var conn = require("../db-connection"),
  CatalogoModel = () => {};

CatalogoModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_catalogo_cuenta()", cb);

CatalogoModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_catalogo_cuenta WHERE id_cuenta = $1", [cod], cb);

CatalogoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_catalogo_cuenta WHERE id_cuenta = $1",
    [data.id_cuenta],
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
                data.id_cuenta,
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

CatalogoModel.delete = (id, cb) =>
  conn.query("call prc_categoria_delete ($1)", [id], cb);

module.exports = CatalogoModel;