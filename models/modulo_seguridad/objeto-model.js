"use strict";

var conn = require("../db-connection"),
  ObjetoModel = () => {};

ObjetoModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.ft_select_objetos()", cb);

ObjetoModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_objetos WHERE objeto = $1", [cod], cb);

ObjetoModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_objetos WHERE id_objeto = $1",
    [data.id_objeto],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "SELECT seguridad.ft_actualizar_objetos($1,$2,$3,$4)", 
              [
                data.id_objeto,
                data.objeto,
                data.descripcion,
                data.tipo_objeto
          
              ],
              cb
            )
          : conn.query(
            "SELECT seguridad.sp_insert_objetos($1,$2,$3)",
              [ 
                data.objeto,
                data.descripcion,
                data.tipo_objeto,
              ],
              cb
            );
      }
    }
  );
};

ObjetoModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_objeto ($1)", [id], cb); 

module.exports = ObjetoModel;
