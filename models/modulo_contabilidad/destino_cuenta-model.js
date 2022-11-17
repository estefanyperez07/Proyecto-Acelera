"use strict";

var conn = require("../db-connection"),
  DestinoCuentaModel = () => {};

DestinoCuentaModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_destino_cuenta()", cb);

DestinoCuentaModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_destino_cuenta WHERE id_destino_cuenta = $1", [cod], cb);


  //FUNCIONA--------------
DestinoCuentaModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_destino_cuenta WHERE id_destino_cuenta = $1",
    [data.id_destino_cuenta],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_destino_cuenta ($1,$2,$3)", 
              [
                data.id_destino_cuenta,
                data.id_cuenta,
                data.id_informe_financiero,
              ],
              cb
            )
          : conn.query(
              "select contabilidad.sp_insert_destino_cuenta ($1,$2)",
              [
                data.id_cuenta,
                data.id_informe_financiero,
              ],
              cb
            );
      }
    }
  );
};

DestinoCuentaModel.delete = (id, cb) =>
  conn.query("select contabilidad.d_delete_destino_cuenta ($1)", [id], cb);

module.exports = DestinoCuentaModel;