"use strict";

var conn = require("../db-connection"),
  EditarUsuarioModel = () => {};

EditarUsuarioModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1 ", [cod], cb);


EditarUsuarioModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1",
    [data.id_usuario],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { 
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_estado ($1,$2,$3,$4)",
              [
                data.id_usuario,
                data.usuario,
                data.nombre_usuario,
                data.correo_electronico
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_estado ($1,$2,$3)",
              [
                data.usuario,
                data.nombre_usuario,
                data.correo_electronico
              ],
              cb
            );
      }
    }
  );
};


module.exports = EditarUsuarioModel;