"use strict";

var conn = require("../db-connection"),
  LibroDetalleModel = () => {};

LibroDetalleModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_diario_detalle()", cb);

LibroDetalleModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_libro_diario_detalle WHERE id_libro_diario_deta = $1 ", [cod], cb);

LibroDetalleModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_libro_diario_detalle WHERE id_libro_diario_deta = $1 and id_libro_diario_enca = $2",
    [data.id_libro_diario_deta],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { //MODIFICAR
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_libro_diario_detalle ($1,$2,$3,$4,$5,$6,$7,$8,$9)", //REVISAR FUNCION, PARECE ESTAR MALA
              [
                data.id_libro_diario_deta, 
                data.id_libro_diario_enca, 
                data.id_subcuenta, id_estado, 
                data.parcial, 
                data.monto_debe, 
                data.monto_haber, 
                data.sinopsis, 
                data.sucursal, 
                data.centro_costo,
              ],
              cb
            )
          : conn.query( //MODIFICAR
              "select contabilidad.sp_insert_libro_diario_detalle ($1,$2,$3,$4,$5,$6,$7,$8)", //REVISAR FUNCION, PARECE ESTAR MALA
              [
                data.id_libro_diario_enca, 
                data.id_subcuenta, id_estado, 
                data.parcial, 
                data.monto_debe, 
                data.monto_haber, 
                data.sinopsis, 
                data.sucursal, 
                data.centro_costo,
              ],
              cb
            );
      }
    }
  );
};

LibroDetalleModel.delete = (cod, cb) => //MODIFICAR
  conn.query("select contabilidad.d_delete_libro_diario_detalle ($1)", [cod], cb);

module.exports = LibroDetalleModel;