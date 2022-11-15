"use strict";

var conn = require("../db-connection"),
  CorrelativoModel = () => {};

CorrelativoModel.getAll = (cb) =>
  conn.query("SELECT * from public.ft_correlativo_getall()", cb);

CorrelativoModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM public.ft_correlativo_getone($1)", [id], cb);

CorrelativoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM public.ft_correlativo_getone($1)",
    [data.id_correlativo],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_correlativo_update ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
              [
                data.id_correlativo,
                data.id_pos,
                data.cai,
                data.sucursal_sar,
                data.terminal_sar,
                data.tipo_documento_sar,
                data.correlativo_inicial,
                data.correlativo_final,
                data.correlativo_actual,
                data.fecha_vencimiento,
                data.activo,
                data.siguiente,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_correlativo_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
              [
                data.id_pos,
                data.cai,
                data.sucursal_sar,
                data.terminal_sar,
                data.tipo_documento_sar,
                data.correlativo_inicial,
                data.correlativo_final,
                data.correlativo_actual,
                data.fecha_vencimiento,
                data.activo,
                data.siguiente,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

CorrelativoModel.delete = (id, cb) =>
  conn.query("call prc_correlativo_delete ($1)", [id], cb);

module.exports = CorrelativoModel;
