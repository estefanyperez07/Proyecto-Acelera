"use strict";

var conn = require("../db-connection"),
  LoginModel = () => {};

LoginModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);

LoginModel.login = (data, cb) => {
    
            conn.query(
              "SELECT seguridad.ft_login($1,$2)",
                [
                data.nombre_usuaurio,
                data.contrasena,
                      
                ],
                cb
            );
        }
   


module.exports = LoginModel;

