"use strict";

var conn = require("../db-connection"),
  SucursalModel = () => {};

SucursalModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_sucursal_getall()", cb);

SucursalModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM ft_sucursal_getone($1)", [cod], cb);

SucursalModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_sucursal WHERE cod_sucursal = $1",
    [data.cod_sucursal],
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
                data.cod_sucursal,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.rtn,
                data.id_centro_costo,
                data.id_mapa,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_sucursal_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
              [
                data.cod_sucursal,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.rtn,
                data.id_centro_costo,
                data.id_mapa,
                data.activo,
                data.creado_por,
                data.fecha_creacion,
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
