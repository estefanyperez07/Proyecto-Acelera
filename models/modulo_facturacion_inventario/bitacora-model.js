"use strict";

var conn = require("../db-connection"),
  BitacoraModel = () => {};

BitacoraModel.getAllByDate = (parametros, cb) =>
  conn.query(
    "SELECT * FROM ft_bitacora_getallbydate($1,$2)",
    [parametros.fecha_inicio, parametros.fecha_final],
    cb
  );

BitacoraModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM ft_bitacora_getallbydate($1,$2)", [cod], cb);

BitacoraModel.save = (data, cb) => {
  conn.query(
    "call public.prc_bitacora_insert($1,$2,$3,$4,$5)",
    [
      data.fecha,
      data.id_usuario,
      data.id_objeto,
      data.accion,
      data.descripcion,
    ],
    cb
  );
};

BitacoraModel.delete = (parametros, cb) =>
  conn.query(
    "call prc_bitacora_delete ($1,$2)",
    [parametros.fecha_inicio, parametros.fecha_final],
    cb
  );

module.exports = BitacoraModel;
