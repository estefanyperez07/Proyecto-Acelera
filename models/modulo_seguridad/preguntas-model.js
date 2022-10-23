"use strict";

var conn = require("../db-connection"),
  PreguntaModel = () => {};

PreguntaModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_preguntas", cb);

PreguntaModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_preguntas WHERE id_pregunta = $1", [id], cb);

PreguntaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_preguntas WHERE id_pregunta = $1",
    [data.id_pregunta],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
            // NO TIENE QUE ACTUALIZAR
              "SELECT seguridad.($1)",
              [
                data.id_pregunta,
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_pregunta($1)",
              [
                data.pregunta,
              ],
              cb
            );
      }
    }
  );
};

PreguntaModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_pregunta($1)", [id], cb);

module.exports = PreguntaModel;

