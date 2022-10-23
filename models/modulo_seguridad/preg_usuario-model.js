"use strict";

var conn = require("../db-connection"),
  UsuarioModel = () => {};

UsuarioModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_preguntas_usuario", cb);

UsuarioModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_preguntas_usuario WHERE id_preguntas_usuario = $1", [id], cb);

UsuarioModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_preguntas_usuario WHERE id_preguntas_usuario = $1",
    [data. id_preguntas_usuario],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_preguntas_usuario($1)",
              [
                data.respuesta
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_preguntas_usuario($1,$2,$3)",
              [
                data.id_usuario,
                data.id_pregunta,
                data.respuesta
              ],
              cb
            );
      }
    }
  );
};

UsuarioModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_preguntas_usuario($1)", [id], cb);

module.exports = UsuarioModel;
