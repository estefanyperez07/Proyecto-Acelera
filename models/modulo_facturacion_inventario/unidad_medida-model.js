"use strict";

var conn = require("../db-connection"),
  UnidadMedidaModel = () => {};

UnidadMedidaModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_unidades_medida", cb);

UnidadMedidaModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM tbl_unidades_medida WHERE cod_unidad_medida = $1",
    [cod],
    cb
  );

UnidadMedidaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_unidades_medida WHERE cod_unidad_medida = $1",
    [data.cod_unidad_medida],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_unidad_medida_update ($1,$2,$3,$4)",
              [
                data.cod_unidad_medida,
                data.descripcion,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_unidad_medida_insert($1,$2,$3,$4)",
              [
                data.cod_unidad_medida,
                data.descripcion,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

UnidadMedidaModel.delete = (cod, cb) =>
  conn.query("call prc_unidad_medida_delete ($1)", [cod], cb);

module.exports = UnidadMedidaModel;
