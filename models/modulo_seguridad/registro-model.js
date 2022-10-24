"use strict";

var conn = require("../db-connection"),
  UsuarioModel = () => {};

UsuarioModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_usuario", cb);

UsuarioModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);

UsuarioModel.save = (data, cb) => {
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
              "SELECT seguridad.ft_actualizar_usuario($1,$2,$3,$4,$5,$6,$7)",
              [
                data.id_usuario,
                data.nombre_usuario,
                data.estado_usuario,
                data.id_rol,
                data.correo_electronico,
                data.modificado_por,
                data.fecha_modificacion
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_usuario($1,$2,$3,$4,$5,$6)",
              [
                data.nombre_usuario,
                data.estado_usuario,    //Por default 1
                data.contrasena,
                data.id_rol,            //Por default 6
                data.correo_electronico,
                data.creado_por         //Por default "nombre_usuario"
              ],
              cb
            );
      }
    }
  );
};

UsuarioModel.autoregistro = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_usuario WHERE nombre_usuario= $1",
    [data.nombre_usuario],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
            "SELECT seguridad.()",
            [
              
            ],
            cb
            )
          : 
              
                conn.query(
                  "SELECT seguridad.ft_insert_autoregistro($1,$2,$3)",
                    [
                      data.nombre_usuario,
                      data.correo_electronico,
                      data.contrasena,
                      
                    ],
                    cb
            );
      }
    }
  );
};

UsuarioModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_usuario($1)", [id], cb);

module.exports = UsuarioModel;
