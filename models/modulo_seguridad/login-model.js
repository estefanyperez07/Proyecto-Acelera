"use strict";

var conn = require("../db-connection"),
  LoginModel = () => {};

LoginModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);


LoginModel.searchToken = (token, cb) =>
  conn.query("SELECT status, token FROM seguridad.tbl_ms_historic_token WHERE token=$1", [token], cb);



// LoginModel.updateToken = (token, cb) =>
//   conn.query("UPDATE seguridad.tbl_ms_historic_token SET status=1 WHERE token=$1", [token], cb);
  
    
  LoginModel.saveToken = (token, cb) =>{
    const text = `
    INSERT INTO seguridad.tbl_ms_historic_token(
      status, token)
     VALUES ( 1, $1);
     `
    const values = [token]
    conn.query(
      text,
      values,
      cb
    );
  }
  
  
  LoginModel.getByNameUser = (nameUser, cb) =>{
    conn.query("SELECT id_usuario,nombre_usuario,estado_usuario,id_rol,correo_electronico FROM seguridad.tbl_ms_usuario WHERE usuario = $1 and nombre_usuario != 'SYSTEMUSER' ", [nameUser], cb);
  }
  
  
  
  LoginModel.changuePassById = (newPassword,id_user, cb) =>{
    const text = `
    UPDATE seguridad.tbl_ms_usuario
	  SET estado_usuario=2, 
    contrasena=$1
  	WHERE (id_usuario=$2)`
    // aca dejo el estado del usuario en 2 (Activo)
    const values = [newPassword,id_user]
    conn.query(
      text,
      values,
      cb
    );
  }
  
 

  LoginModel.updateToken = (token, cb) =>{
    const text = `
    UPDATE seguridad.tbl_ms_token_historic
	  SET status=1
	  WHERE token=$1`
    
    const values = [token]
    conn.query(
      text,
      values,
      cb
    );
  }

LoginModel.login = (data, cb) => {
            const text = 'SELECT seguridad.ft_login($1,$2)'
            const values = [data.nombre_usuario, data.contrasena]
            conn.query(
              text,
              values,
              cb
            );
        }

    
   


module.exports = LoginModel;

