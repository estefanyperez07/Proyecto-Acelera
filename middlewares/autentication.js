const jwt = require("jsonwebtoken");
var validator = require("validator");
const  JWT_SECRET = "PR0Y3CT0_M0DUL0_D3_S3GUR1D4D";
 async function middlewareFunction(req, res, next) {
      try {
          const userToken = req.get('x-token')
          
            
            if (!userToken) {
                return res.status(409).send({
                    status: false,
                    code: 409,
                    message: "token no encontrado",
                    object: [],
                  })
            }
    
            if (!validator.isJWT(userToken)) {
                return res.status(400).send( {
                    status: false,
                    code: 400,
                    message: "Formato de token no valido",
                    object: [],
                  })
            }
    
            await jwt.verify(userToken, JWT_SECRET, async (err, decoded)=>{
                if (err) {
                  return res.status(404).json({
                    status: false,
                    code: 404,
                    message: "Token NO válido",
                    object: [],
                  });
                }
                req.usuario = decoded.usuario
                next()
            });
    
        } catch (e ) {
           
            return res.status(500).send({
                status: false,
                code: 500,
                message: "error en el servidor",
                object: [e],
              })
        
    }
  
}

module.exports = middlewareFunction