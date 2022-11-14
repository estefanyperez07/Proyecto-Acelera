"use strict";

var conn = require("../db-connection"),
  PeriodoContableModel = () => {};

PeriodoContableModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_periodo_contable()", cb);

PeriodoContableModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_one_periodo_contable($1)", [cod], cb);

PeriodoContableModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_periodo_contable WHERE id_periodo_contable = $1",
    [data.id_periodo_contable],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { 
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_periodo_contable ($1,$2,$3,$4,$5,$6,$7,$8)",
              [
                data.id_periodo_contable,
                data.descripcion_periodo,
                data.fecha_inicial,
                data.fecha_final,
                data.fecha_creacion,
                data.id_usuario,
                data.tipo_periodo,
                data.estado_periodo,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_periodo_contable ($1,$2,$3,$4,$5,$6,$7)",
              [
                data.descripcion_periodo,
                data.fecha_inicial,
                data.fecha_final,
                data.fecha_creacion,
                data.id_usuario,
                data.tipo_periodo,
                data.estado_periodo,
              ],
              cb
            );
      }
    }
  );
};

PeriodoContableModel.delete = (cod, cb) =>
  conn.query("select contabilidad.d_delete_periodo_contable ($1)", [cod], cb);

module.exports = PeriodoContableModel;