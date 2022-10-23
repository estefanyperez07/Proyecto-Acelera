"use strict";

var conn = require("../db-connection"),
  ParametroModel = () => {};

ParametroModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_parametros", cb);

ParametroModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_parametros WHERE id_parametro = $1", [id], cb);

ParametroModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_parametros WHERE id_parametro = $1",
    [data.id_parametro],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_parametros($1,$2,$3,$4)",
              [
                data.parametro,
                data.valor,
                data.modificado_por,
                data.fecha_modificacion
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_parametros($1,$2,$3)",
              [
                data.parametro,
                data.valor,
                data.creado_por
              ],
              cb
            );
      }
    }
  );
};

ParametroModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_parametro($1)", [id], cb);

module.exports = ParametroModel;