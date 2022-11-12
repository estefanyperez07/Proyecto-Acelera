"use strict";

var conn = require("../db-connection"),
  DescuentoModel = () => {};

DescuentoModel.getAll = (cb) => conn.query("SELECT * FROM tbl_descuento", cb);

DescuentoModel.getAllActive = (cb) =>
  conn.query("SELECT * FROM tbl_descuento where activo ='1'", cb);

DescuentoModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM tbl_descuento WHERE cod_descuento = $1", [cod], cb);

DescuentoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_descuento WHERE cod_descuento = $1",
    [data.cod_descuento],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_descuento_update ($1,$2,$3,$4,$5,$6)",
              [
                data.cod_descuento,
                data.descripcion,
                data.porcentaje,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_descuento_insert ($1,$2,$3,$4,$5,$6)",
              [
                data.cod_descuento,
                data.descripcion,
                data.porcentaje,
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

DescuentoModel.delete = (cod, cb) =>
  conn.query("call prc_descuento_delete ($1)", [cod], cb);

module.exports = DescuentoModel;
