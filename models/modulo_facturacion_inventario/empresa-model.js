"use strict";

var conn = require("../db-connection"),
  EmpresaModel = () => {};

EmpresaModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_sucursal_getall()", cb);

EmpresaModel.getOne = (cb) =>
  conn.query(
    "SELECT * FROM tbl_empresa limit 1",

    cb
  );

EmpresaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_empresa WHERE id_empresa = $1 limit 1",
    [data.id_empresa],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_empresa_update($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
              [
                data.id_empresa,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.correo,
                data.rtn,
                data.logo1,
                data.logo2,
                data.logo3,
                data.logo4,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call public.prc_empresa_insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
              [
                data.descripcion,
                data.direccion,
                data.telefono,
                data.correo,
                data.rtn,
                data.logo1,
                data.logo2,
                data.logo3,
                data.logo4,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

EmpresaModel.delete = (id, cb) =>
  conn.query("call prc_sucursal_delete ($1)", [id], cb);

module.exports = EmpresaModel;
