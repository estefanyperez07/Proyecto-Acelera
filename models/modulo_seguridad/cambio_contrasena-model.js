"use strict";

var conn = require("../db-connection"),
  CambioContrasenaModel = () => {};

CambioContrasenaModel.save = (data, cb) => {
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
              "select contabilidad.ft_actualizar_estado ($1,$2,$3)",
              [
                data.contrasena_actual,
                data.contrasena_nueva,
                data.contrasena_nueva_conf,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_estado ($1,$2,$3)",
              [
                data.contrasena_actual,
                data.contrasena_nueva,
                data.contrasena_nueva_conf,
              ],
              cb
            );
      }
    }
  );
};


module.exports = CambioContrasenaModel;