"use strict";

var conn = require("./db-connection"),
  SocioNegocioModel = () => {};

SocioNegocioModel.getAll = (cb) => conn.query("SELECT * FROM tbl_socio_negocio", cb);

SocioNegocioModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM tbl_socio_negocio WHERE id_socio_negocio = $1", [id], cb);

SocioNegocioModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_socio_negocio WHERE id_socio_negocio = $1",
    [data.id_socio_negocio],
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
                data.id_socio_negocio,
                data.tipo,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.contacto,
                data.correo,
                data.rtn,
                data.balance,
                data.cuenta_contable,
                data.modificado_por,
                data.fecha_modificacion,
                data.activo
              ],
              cb
            )
          : conn.query(
              "call prc_socio_negocio_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
              [
                data.id_socio_negocio,
                data.tipo,
                data.descripcion,
                data.direccion,
                data.telefono,
                data.contacto,
                data.correo,
                data.rtn,
                data.balance,
                data.cuenta_contable,
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

SocioNegocioModel.delete = (id, cb) =>
  conn.query("call prc_socio_negocio_delete ($1)", [id], cb);

module.exports = SocioNegocioModel;
