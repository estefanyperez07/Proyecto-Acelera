"use strict";

var conn = require("../db-connection"),
  PreguntaModel = () => {};

PreguntaModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_preguntas", cb);

PreguntaModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_preguntas WHERE id_pregunta = $1", [id], cb);

PreguntaModel.save = (data, cb) => {
  conn.query(
    "SELECT seguridad.sp_insert_pregunta($1)",
      [
        data.pregunta,
      ],
      cb
    );
};

PreguntaModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_pregunta($1)", [id], cb);

module.exports = PreguntaModel;

