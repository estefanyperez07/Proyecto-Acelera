"use strict";

var conn = require("../db-connection"),
  SubcuentaModel = () => {};

SubcuentaModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_subcuenta()", cb);

SubcuentaModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_subcuenta WHERE nombre_subcuenta=$1 ", [cod], cb);


  //FUNCIONA-----------------------
SubcuentaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_subcuenta WHERE id_subcuenta = $1",
    [data.id_subcuenta],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { 
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_subcuenta ($1,$2,$3)", 
              [
                data.id_subcuenta,
                data.id_cuenta,
                data.nombre_subcuenta,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_subcuenta ($1,$2)",
              [
                data.id_cuenta,
                data.nombre_subcuenta,
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