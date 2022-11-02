"use strict";

var conn = require("../db-connection"),
  ListaMaterialesModel = () => {};

ListaMaterialesModel.getAll = (cb) =>
  conn.query("SELECT * FROM tbl_lista_materiales", cb);

ListaMaterialesModel.getOne = (id_padre, id_hijo, cb) =>
  conn.query(
    "SELECT * from public.ft_lista_materiales_getone($1,$2)",
    [id_padre, id_hijo],
    cb
  );
ListaMaterialesModel.padreGetAll = (id_padre, cb) =>
  conn.query(
    "SELECT * from public.ft_lista_materiales_padre_getall($1)",
    [id_padre],
    cb
  );

ListaMaterialesModel.save = (data, cb) => {
  conn.query(
    "SELECT * from public.ft_lista_materiales_getone($1,$2)",
    [data.id_articulo_padre, data.id_articulo_hijo],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_lista_materiales_update ($1,$2,$3,$4,$5,$6)",
              [
                data.id_articulo_padre,
                data.id_articulo_hijo,
                data.cantidad,
                data.comentario,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_lista_materiales_insert ($1,$2,$3,$4,$5,$6)",
              [
                data.id_articulo_padre,
                data.id_articulo_hijo,
                data.cantidad,
                data.comentario,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

ListaMaterialesModel.delete = (id_padre, id_hijo, cb) =>
  conn.query(
    "CALL public.prc_lista_materiales_delete($1,$2)",
    [id_padre, id_hijo],
    cb
  );

module.exports = ListaMaterialesModel;
