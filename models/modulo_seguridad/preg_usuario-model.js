"use strict";

var conn = require("../db-connection"),
  PreguntasUsuarioModel = () => { };

PreguntasUsuarioModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_preguntas_usuario", cb);

PreguntasUsuarioModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_preguntas_usuario WHERE id_preguntas_usuario = $1", [id], cb);

PreguntasUsuarioModel.save = (data, cb) => {
  conn.query(
    "SELECT seguridad.sp_insert_preguntas_usuario($1,$2,$3)",
    [
      data.id_usuario,
      data.id_pregunta,
      data.respuesta
    ],
    cb
  );
};

PreguntasUsuarioModel.update = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_preguntas_usuario WHERE id_preguntas_usuario = $1",
    [data.id_preguntas_usuario],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_preguntas_usuario($1,$2)",
              [
                data.id_preguntas_usuario,
          
                data.respuesta 
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.",
              [
                
              ],
              cb
            );
      }
    }
  );
};

PreguntasUsuarioModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_preguntas_usuario($1)", [id], cb);

module.exports = PreguntasUsuarioModel;
