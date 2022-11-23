"use strict";

var conn = require("../db-connection"),
  SocioNegocioModel = () => {};

SocioNegocioModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_socio_negocio", cb);

SocioNegocioModel.getAllClientes = (cb) =>
  conn.query("SELECT * FROM tbl_socio_negocio where tipo='C'", cb);

SocioNegocioModel.getAllProveedores = (cb) =>
  conn.query("SELECT * FROM tbl_socio_negocio where tipo='P'", cb);

SocioNegocioModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM tbl_socio_negocio WHERE cod_socio_negocio = $1",
    [cod],
    cb
  );

SocioNegocioModel.getOneRTN = (rtn, cb) =>
  conn.query("SELECT * FROM tbl_socio_negocio WHERE rtn = $1", [rtn], cb);

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

SocioNegocioModel.savePorRTNNombre = (data, cb) => {
  conn.query(
    "SELECT * FROM tbl_socio_negocio WHERE rtn = $1",
    [data.rtn],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select fcn_socio_negocio_update_por_rtn ($1,$2,$3,$4)",
              [
                data.descripcion,
                data.rtn,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "select fcn_socio_negocio_insert_por_rtn ($1,$2,$3,$4)",
              [
                data.descripcion,
                data.rtn,
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
