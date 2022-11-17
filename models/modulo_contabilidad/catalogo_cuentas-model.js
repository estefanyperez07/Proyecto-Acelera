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
 //FUNCIONA------------------
      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_catalogo($1,$2,$3,$4,$5)",
              [
                data.id_cuenta,
                data.codigo_cuenta,
                data.nombre_cuenta,
                data.id_categoria,
                data.id_destino_cuenta,
              ],
              cb
            )
          : conn.query(
              "select contabilidad.sp_insert_catalogo_cuenta ($1,$2,$3,$4,$5,$6)",
              [
                data.id_usuario,
                data.codigo_cuenta,
                data.nombre_cuenta,
                data.id_categoria,
                data.id_destino_cuenta,
                data.saldo,
              ],
              cb
            );
      }
    }
  );
};

CatalogoModel.delete = (id, cb) =>
  conn.query("select contabilidad.d_delete_catalogo_cuenta ($1)", [id], cb);

module.exports = CatalogoModel;