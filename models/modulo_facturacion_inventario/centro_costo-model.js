"use strict";

var conn = require("../db-connection"),
  CentroCostoModel = () => {};

CentroCostoModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_centro_costo", cb);

CentroCostoModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM tbl_centro_costo WHERE cod_centro_costo = $1",
    [cod],
    cb
  );

CentroCostoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_centro_costo WHERE cod_centro_costo = $1",
    [data.cod_centro_costo],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_centro_costo_update ($1,$2,$3,$4,$5)",
              [
                data.cod_centro_costo,
                data.descripcion,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_centro_costo_insert ($1,$2,$3,$4,$5)",
              [
                data.cod_centro_costo,
                data.descripcion,
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

CentroCostoModel.delete = (cod, cb) =>
  conn.query("call prc_centro_costo_delete ($1)", [cod], cb);

module.exports = CentroCostoModel;
