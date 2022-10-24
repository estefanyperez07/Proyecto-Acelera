
const conn = require("../db-connection")

exports.login = async function(req, res, next) {

  let esLoginCorrecto = await db.func("seguridad.ft_login", [req.body.usuario, req.body.pass]).catch(error => {
    console.log(error)
    res.send({msg:"Ocurrio un error al intentar registrar el usuario"})
  })
  
  res.send(esLoginCorrecto)

}

