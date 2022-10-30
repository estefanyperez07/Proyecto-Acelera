"use strict";

var conn = require("../db-connection"),
  SocioNegocioModel = () => {};

SocioNegocioModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_socio_negocio", cb);

SocioNegocioModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM tbl_socio_negocio WHERE cod_socio_negocio = $1",
    [cod],
    cb
  );

SocioNegocioModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_socio_negocio WHERE cod_socio_negocio = $1",
    [data.cod_socio_negocio],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_socio_negocio_update ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
              [
                data.cod_socio_negocio,
                data.tipo,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.contacto,
                data.correo,
                data.rtn,
                data.balance,
                data.cuenta_contable,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_socio_negocio_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
              [
                data.cod_socio_negocio,
                data.tipo,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.contacto,
                data.correo,
                data.rtn,
                data.balance,
                data.cuenta_contable,
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

SocioNegocioModel.delete = (cod, cb) =>
  conn.query("call prc_socio_negocio_delete ($1)", [cod], cb);

module.exports = SocioNegocioModel;
