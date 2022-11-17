"use strict";

var conn = require("../db-connection"),
  InformeFinancieroModel = () => {};

InformeFinancieroModel.getAll = (cb) => conn.query("SELECT * FROM contabilidad.ft_select_informe_financiero()", cb);

InformeFinancieroModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_informe_financiero WHERE id_informe_financiero = $1", [cod], cb);


  //FUNCIONA----------------
InformeFinancieroModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_informe_financiero WHERE id_informe_financiero = $1",
    [data.id_informe_financiero],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_informe_financiero ($1,$2)",
              [
                data.id_informe_financiero,
                data.descripcion,
              ],
              cb
            )
          : conn.query(
              "select contabilidad.sp_insert_informe_financiero ($1)",
              [
                data.descripcion,
              ],
              cb
            );
      }
    }
  );
};

InformeFinancieroModel.delete = (id, cb) =>
  conn.query("select contabilidad.d_delete_informe_financiero ($1)", [id], cb);

module.exports = InformeFinancieroModel;