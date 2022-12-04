"use strict";

var conn = require("../db-connection"),
  LibroDetalleModel = () => {};

LibroDetalleModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_diario_detalle()", cb);

LibroDetalleModel.getOne = (id_libro_diario_enca, cb) =>
  conn.query(
    "select * from contabilidad.ft_select_libro_diario_detalle($1) ",
    [id_libro_diario_enca],
    cb
  );

//FUNCIONA----------------------------

LibroDetalleModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_libro_diario_detalle WHERE id_libro_diario_deta = $1",
    [data.id_libro_diario_deta],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_libro_diario_detalle ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
              [
                data.id_libro_diario_deta,
                data.id_subcuenta,
                data.id_estado,
                data.parcial,
                data.monto_debe,
                data.monto_haber,
                data.sinopsis,
                data.id_sucursal,
                data.id_centro_costo,
              ],
              cb
            )
          : conn.query(
              "select contabilidad.sp_insert_libro_diario_detalle ($1,$2,$3,$4,$5,$6,$7,$8)",
              [
                data.id_libro_diario_enca,
                data.id_subcuenta,
                data.id_estado,
                data.monto_debe,
                data.monto_haber,
                data.sinopsis,
                data.id_sucursal,
                data.id_centro_costo,
              ],
              cb
            );
      }
    }
  );
};

LibroDetalleModel.delete = (cod, cb) =>
  conn.query(
    "select contabilidad.d_delete_libro_diario_detalle ($1)",
    [cod],
    cb
  );

module.exports = LibroDetalleModel;
