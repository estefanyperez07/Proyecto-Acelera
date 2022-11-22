"use strict";

var conn = require("../db-connection"),
  UsuarioModel = () => {};


UsuarioModel.getOne = (usuario,id_usuario, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE usuario = $1 AND id_usuario = $2", [usuario,id_usuario], cb);

// UsuarioModel.getAll = (cb) => conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE nombre_usuario != 'SYSTEMUSER' ", cb);
UsuarioModel.getAll = (cb) => conn.query(`
SELECT 
u.id_usuario,
u.usuario,
u.nombre_usuario,
u.estado_usuario,
e.descripcion,
u.contrasena,
u.id_rol,
r.rol,
u.fecha_ultima_conexion,
u.preguntas_contestadas,
u.primer_ingreso,
u.fecha_vencimiento,
u.correo_electronico,
u.creado_por,
u.fecha_creacion,
u.modificado_por,
u.fecha_modificacion,
u.intentos_login
FROM seguridad.tbl_ms_usuario as u
INNER JOIN seguridad.tbl_ms_roles as r 
ON u.id_rol = r.id_rol
INNER JOIN seguridad.tbl_ms_usuario_estado as e 
ON u.estado_usuario = e.id
WHERE nombre_usuario != 'SYSTEMUSER' 
OR usuario != 'SYSTEMUSER' 
ORDER BY u.id_usuario DESC 
`, cb);


UsuarioModel.validateUserState = (id ,cb) => conn.query("SELECT id_usuario,estado_usuario,id_rol,fecha_vencimiento FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1",[id], cb);


UsuarioModel.updateUserState = (id,preguntas_contestadas ,cb) => conn.query("UPDATE seguridad.tbl_ms_usuario SET estado_usuario=2, preguntas_contestadas =$2 WHERE id_usuario = $1",[id,preguntas_contestadas], cb);

UsuarioModel.saveHistoricPassword = (id_usuario,contrasena) => conn.query(
  `INSERT INTO seguridad.tbl_ms_hist_contrasena(
	id_usuario,
	contrasena,
	fecha)
	VALUES ($1,$2, NOW());`,
  [id_usuario,contrasena]);

UsuarioModel.updateUserbyId = (data ,cb) => conn.query(`
UPDATE seguridad.tbl_ms_usuario
	SET 
  nombre_usuario=$1,
	estado_usuario=$2,
	id_rol=$3,
	modificado_por=$4,
	fecha_modificacion= NOW()
	WHERE id_usuario=$5

  `,[
    data.nombre_usuario,
    data.estado_usuario,
    data.id_rol,
    data.modificado_por,
    data.id_usuario,
  ], cb);


UsuarioModel.getOne = (id, cb) =>
  conn.query("SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1", [id], cb);

UsuarioModel.save = (data, cb) => {
console.log('data',data)


const text = `
INSERT INTO seguridad.tbl_ms_usuario(
  usuario, 
  nombre_usuario, 
  estado_usuario, 
  contrasena, 
  id_rol, 
  preguntas_contestadas,
  primer_ingreso,
  fecha_vencimiento,
  correo_electronico,
  creado_por,
  fecha_creacion,
  intentos_login
)
  VALUES ( 
    $1, 
    $2, 
    1,
    $3, 
    $4,
    0,
    1,
    (NOW() + interval '${data.paramVigencia} days'), 
    $5,
    $6,
    NOW(),
    0
    )
    RETURNING *
     `
    const values = [
      data.usuario,
      data.nombre_usuario,
      data.contrasena,
      data.id_rol,
      data.correo_electronico,
      data.creado_por,
    ]
    conn.query(
      text,
      values,
      (err,res)=>{
        console.log('err',err)
        console.log('res.rows[0]',res.rows[0])
        conn.query(
          `INSERT INTO seguridad.tbl_ms_hist_contrasena(
          id_usuario,
          contrasena,
          fecha)
          VALUES ($1,$2, NOW());`,
          [res.rows[0].id_usuario,data.contrasena],cb)
      }
    );
 

  // conn.query(
  //   "SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1",
  //   [data.id_usuario],
  //   (err, rows) => {
  //     console.log(`Número de registros: ${rows.rows.length}`);
  //     console.log(`Número de registros: ${err}`);

  //     if (err) {
  //       return err;
  //     } else {
  //       return rows.rows.length === 1
  //         ? conn.query(
  //             "SELECT seguridad.ft_actualizar_usuario($1,$2,$3,$4,$5,$6,$7)",
  //             [
  //               data.id_usuario,
  //               data.nombre_usuario,
  //               data.estado_usuario,
  //               data.id_rol,
  //               data.correo_electronico,
  //               data.modificado_por,
  //               data.fecha_modificacion
  //             ],
  //             cb
  //           )
  //         : conn.query(
  //           "SELECT seguridad.sp_insert_usuario($1,$2,$3,$4,$5,$6)",
  //             [
  //               data.nombre_usuario,
  //               data.estado_usuario,    //Por default 1
  //               data.contrasena,
  //               data.id_rol,            //Por default 6
  //               data.correo_electronico,
  //               data.creado_por         //Por default "nombre_usuario"
  //             ],
  //             cb
  //           );
  //     }
  //   }
  // );
};

UsuarioModel.autoregistro = async (data, cb) => {

await  conn.query(
    `
    INSERT INTO seguridad.tbl_ms_usuario(
      usuario, 
      nombre_usuario, 
      estado_usuario, 
      contrasena, 
      id_rol, 
      preguntas_contestadas,
      primer_ingreso,
      fecha_vencimiento,
      correo_electronico,
      creado_por,
      fecha_creacion,
      intentos_login
    )
      VALUES ( 
        $1, 
        $2, 
        1,
        $3, 
        1,
        0,
        1,
        (NOW() + interval '${data.paramVigencia} days'), 
        $4,
        'AUTOREGISTRO',
        NOW(),
        0
        )
        RETURNING *
        `,
      [
        data.usuario,
        data.nombre_usuario,
        data.contrasena,
        data.correo_electronico,
      ],
      (err,res)=>{
        console.log('err',err)
        console.log('res',res.rows[0])
        conn.query(
          `INSERT INTO seguridad.tbl_ms_hist_contrasena(
          id_usuario,
          contrasena,
          fecha)
          VALUES ($1,$2, NOW());`,
          [res.rows[0].id_usuario,data.contrasena],cb)
      }
  );
};
// UsuarioModel.autoregistro = (data, cb) => {
//   conn.query(
//     "SELECT * FROM seguridad.tbl_ms_usuario WHERE nombre_usuario= $1",
//     [data.nombre_usuario],
//     (err, rows) => {
//       console.log(`Número de registros: ${rows.rows.length}`);
//       console.log(`Número de registros: ${err}`);

//       if (err) {
//         return err;
//       } else {
//         return rows.rows.length === 1
//           ? conn.query(
//             "SELECT seguridad.()",
//             [
              
//             ],
//             cb
//             )
//           :
//             conn.query(
//               "SELECT seguridad.ft_insert_autoregistro($1,$2,$3)",
//                 [
//                 data.nombre_usuario,
//                 data.correo_electronico,
//                 data.contrasena,
                      
//                 ],
//                 cb
//             );
//       }
//     }
//   );
// };

UsuarioModel.delete = (id, cb) =>
  conn.query("SELECT seguridad.d_delete_usuario($1)", [id], cb);

module.exports = UsuarioModel;
