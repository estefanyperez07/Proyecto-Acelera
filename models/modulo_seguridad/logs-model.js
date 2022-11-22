"use strict";

var conn = require("../db-connection"),
  LogsModel = () => {};

// LogsModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_bitacora", cb);
LogsModel.getAll = (cb) => conn.query(`
      SELECT U.NOMBRE_USUARIO,
      ID_BITACORA,
      FECHA,
      B.ID_USUARIO,
      ACCION,
      DESCRIPCION
      FROM SEGURIDAD.TBL_MS_BITACORA B
      INNER JOIN SEGURIDAD.TBL_MS_USUARIO U ON B.ID_USUARIO = U.ID_USUARIO
      ORDER BY B.FECHA
` , cb);

 

LogsModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_bitacora WHERE id_usuario = $1", [id], cb);

LogsModel.save = (data, cb) => {
  conn.query(
    "INSERT INTO seguridad.tbl_ms_bitacora( fecha, id_usuario, accion, descripcion) VALUES ( $1, $2, $3, $4)",
    [
      data.fecha,
      data.id_usuario,
      data.accion,
      data.descripcion,
    ],
    cb
  );
};

module.exports = LogsModel;
