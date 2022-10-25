"use strict";

var conn = require("./db-connection"),
  SucursalModel = () => {};

SucursalModel.getAll = (cb) => conn.query("SELECT * FROM tbl_sucursal", cb);

SucursalModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_sucursal WHERE id_sucursal = $1", [id], cb);

SucursalModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_sucursal WHERE id_sucursal = $1",
    [data.id_sucursal],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_sucursal_update ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
              [
                data.id_sucursal,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.rtn,
                data.id_centro_costo,
                data.id_mapa,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo
              ],
              cb
            )
          : conn.query(
              "call prc_sucursal_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
              [
                data.id_sucursal,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.rtn,
                data.id_centro_costo,
                data.id_mapa,
                data.creado_por,
                data.fecha_creacion,
                data.activo
              ],
              cb
            );
      }
    }
  );
};

SucursalModel.delete = (id, cb) =>
  conn.query("call prc_sucursal_delete ($1)", [id], cb);

module.exports = SucursalModel;
