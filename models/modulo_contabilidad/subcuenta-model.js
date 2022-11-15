"use strict";

var conn = require("../db-connection"),
  SubcuentaModel = () => {};

SubcuentaModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_subcuenta()", cb);

SubcuentaModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_subcuenta WHERE id_subcuenta = $1 ", [cod], cb);

SubcuentaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_subcuenta WHERE id_subcuenta = $1 and id_cuenta = $2",
    [data.id_subcuenta],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { //MODIFICAR
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select prc_articulo_update ($1,$2,$3,$4,$5)", //FALTA LA FUNCION DE ACTUALIZAR EN POSTGRES
              [
                data.id_subcuenta,
                data.id_cuenta,
                data.nombre_cuenta,
                data.nombre_subcuenta,
                data.saldo,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_subcuenta ($1,$2,$3,$4)",
              [
                data.id_cuenta,
                data.nombre_cuenta,
                data.nombre_subcuenta,
                data.saldo,
              ],
              cb
            );
      }
    }
  );
};

SubcuentaModel.delete = (cod, cb) => 
  conn.query("select contabilidad.d_delete_subcuenta ($1)", [cod], cb);

module.exports = SubcuentaModel;