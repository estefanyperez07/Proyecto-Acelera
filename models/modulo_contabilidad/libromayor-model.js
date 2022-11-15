"use strict";

var conn = require("../db-connection"),
  LibroMayorModel = () => {};

LibroMayorModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_libro_mayor()", cb);

LibroMayorModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_libro_mayor WHERE id_libro_mayor = $1 ", [cod], cb);

LibroMayorModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_libro_mayor WHERE id_libro_mayor = $1",
    [data.id_libro_mayor],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { 
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_libro_mayor ($1,$2,$3,$4,$5,$6,$7,$8)", //REVISAR FUNCION
              [
                data.id_libro_mayor, 
                data.id_periodo_contable, 
                data.fecha, 
                data.id_cuenta, 
                data.id_subcuenta,
                data.monto_debe, 
                data.monto_haber, 
                data.saldo,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_libro_mayor ($1,$2,$3,$4,$5,$6,$7)", //REVISAR FUNCION
              [
                data.id_periodo_contable, 
                data.fecha, 
                data.id_cuenta, 
                data.id_subcuenta,
                data.monto_debe, 
                data.monto_haber, 
                data.saldo,
              ],
              cb
            );
      }
    }
  );
};

LibroMayorModel.delete = (cod, cb) => //MODIFICAR
  conn.query("select contabilidad.d_delete_libro_mayor ($1)", [cod], cb);

module.exports = LibroMayorModel;