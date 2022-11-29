"use strict";

var conn = require("../db-connection"),
  ParametroModel = () => {};

ParametroModel.getAll = (cb) =>
  conn.query("SELECT * FROM seguridad.ft_select_parametros()", cb);

ParametroModel.getOne = (cod, cb) =>
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_parametros WHERE parametro = $1",
    [cod],
    cb
  );

ParametroModel.getSucBod = (usuario, cb) =>
  conn.query(
    `select 		A.ID_SUCURSAL
              ,B.COD_SUCURSAL
              ,B.DESCRIPCION descripcion_sucursal 
              ,c.id_centro_costo
              ,c.cod_centro_costo
              ,c.descripcion descripcion_centro_costo
        from seguridad.tbl_ms_usuario A
        INNER JOIN public.tbl_sucursal B ON A.id_sucursal = B.id_sucursal
        LEFT JOIN public.tbl_centro_costo C ON C.id_centro_costo = B.id_centro_costo
        where usuario = $1`,
    [usuario],
    cb
  );

ParametroModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_parametros WHERE id_parametro = $1",
    [data.id_parametro],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_parametros($1,$2,$3,$4,$5)",
              [
                data.id_parametro,
                data.parametro,
                data.valor,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "SELECT seguridad.sp_insert_parametros($1,$2,$3,$4)",
              [
                data.parametro,
                data.valor,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

ParametroModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_parametro($1)", [id], cb);

module.exports = ParametroModel;
