"use strict";

var conn = require("../db-connection"),
  PermisosModel = () => {};

PermisosModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_permisos", cb);

PermisosModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_permisos WHERE id_permiso = $1", [id], cb);

PermisosModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_permisos WHERE id_permiso = $1",
    [data.id_permiso],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_permiso($1,$2,$3,$4,$5,$6,$7,$8,$9)",
              [
                data.id_permiso,
                data.id_rol,
                data.id_objeto,
                data.permiso_insercion,
                data.permiso_eliminacion,
                data.permiso_actualizacion,
                data.permiso_consultar,
                data.modificado_por,
                data.fecha_modificacion
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_permisos($1,$2,$3,$4,$5,$6,$7)",
              [
                
                data.permiso_insercion,
                data.permiso_eliminacion,
                data.permiso_actualizacion,
                data.permiso_consultar,
                data.creado_por,
                data.id_rol,
                data.id_objeto
              ],
              cb
            );
      }
    }
  );
};

PermisosModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_permisos($1)", [id], cb);

module.exports = PermisosModel;