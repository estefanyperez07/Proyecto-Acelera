"use strict";

var conn = require("../db-connection"),
  LoginModel = () => {};

LoginModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);

LoginModel.login = (data, cb) => {
  conn.query(
    "SELECT * FROM seguridad.tbl_ms_usuario WHERE nombre_usuario= $1",
    [data.nombre_usuario],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
            "SELECT seguridad.()",
            [
              
            ],
            cb
            )
          :     
            conn.query(
              "SELECT seguridad.ft_login($1,$2)",
                [
                data.usuario,
                data.pass,
                      
                ],
                cb
            );
      }
    }
  );
};


module.exports = LoginModel;

