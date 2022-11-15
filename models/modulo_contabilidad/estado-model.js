"use strict";

var conn = require("../db-connection"),
  EstadoModel = () => {};

EstadoModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_estado()", cb);

EstadoModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_estado WHERE id_estado = $1 ", [cod], cb);

EstadoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_estado WHERE id_estado = $1",
    [data.id_estado],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { 
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_estado ($1,$2)",
              [
                data.id_estado,
                data.tipo_estado,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_estado ($1)",
              [
                data.tipo_estado,
              ],
              cb
            );
      }
    }
  );
};

EstadoModel.delete = (cod, cb) => //MODIFICAR
  conn.query("select contabilidad.d_delete_estado ($1)", [cod], cb);

module.exports = EstadoModel;