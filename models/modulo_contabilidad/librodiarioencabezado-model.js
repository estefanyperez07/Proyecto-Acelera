"use strict";

var conn = require("../db-connection"),
  LibroEncabezadoModel = () => {};

LibroEncabezadoModel.getAll = (cb) =>
  conn.query("SELECT * FROM contabilidad.ft_select_libro_diario_encabezado()", cb);

LibroEncabezadoModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM contabilidad.tbl_libro_diario_encabezado WHERE id_libro_diario_enca = $1 ", [cod], cb);

  LibroEncabezadoModel.post = (data, cb) => {
    conn.query("select contabilidad.fcn_diario_insert($1)", [data], cb);
  };

LibroEncabezadoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM contabilidad.tbl_libro_diario_encabezado WHERE id_libro_diario_enca = $1",
    [data.id_libro_diario_enca],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) { //MODIFICAR
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "select contabilidad.ft_actualizar_libro_diario_encabezado ($1,$2,$3,$4,$5,$6,$7,$8)", //REVISAR FUNCION, PARECE ESTAR MALA
              [
                data.id_libro_diario_enca, 
                data.id_estado, 
                data.descripcion, 
                data.fecha, 
                data.monto_debe, 
                data.monto_haber, 
                data.id_usuario, 
                data.nombre_usuario,
              ],
              cb
            )
          : conn.query( 
              "select contabilidad.sp_insert_libro_diario_encabezado ($1,$2,$3,$4,$5,$6,$7)", //REVISAR FUNCION, PARECE ESTAR MALA
              [
                data.id_estado, 
                data.descripcion, 
                data.fecha, 
                data.monto_debe, 
                data.monto_haber, 
                data.id_usuario, 
                data.nombre_usuario,
              ],
              cb
            );
      }
    }
  );
};

LibroEncabezadoModel.delete = (cod, cb) => //MODIFICAR
  conn.query("select contabilidad.d_delete_libro_diario_encabezado ($1)", [cod], cb);

module.exports = LibroEncabezadoModel;