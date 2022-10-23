"use strict";

var conn = require("../db-connection"),
  RolModel = () => {};

//SELECT DE TODOS LOS REGISTROS DE LA TABLA ROLES
RolModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_roles", cb);

//SELECT PARA UN REGISTRO ESPECIFICO DE LA TABLA ROLES
RolModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_roles WHERE id_rol = $1", [id], cb);

//GUARDAR ROLES AL CREAR O ACTUALIZAR
RolModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_roles WHERE id_rol = $1",
    [data.id_rol],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_rol($1,$2,$3,$4,$5)",
              [
                data.id_rol,
                data.rol,
                data.descripcion,
                data.modificado_por,
                data.fecha_modificacion
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_rol($1,$2,$3)",
              [
                data.rol,
                data.descripcion,
                data.creado_por
              ],
              cb
            );
      }
    }
  );
};

//BORRAR ROLES
RolModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_rol($1)", [id], cb);

module.exports = RolModel;
