"use strict";

var conn = require("../db-connection"),
  EstadoUserModel = () => {};

//SELECT DE TODOS LOS REGISTROS DE LA TABLA ESTADO
EstadoUserModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_usuario_estado", cb);

//SELECT PARA UN REGISTRO ESPECIFICO DE LA TABLA ESTADO
EstadoUserModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario_estado WHERE id = $1", [id], cb);

//GUARDAR ESTADO AL CREAR O ACTUALIZAR
EstadoUserModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_usuario_estado WHERE id = $1",
    [data.id],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualiza_estado_usuario($1,$2)",
              [
                data.id,
                data.descripcion
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_estado_usuario($1)",
              [
                data.descripcion
              ],
              cb
            );
      }
    }
  );
};

//BORRAR ESTADO
EstadoUserModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_estado($1)", [id], cb);

module.exports = EstadoUserModel;
