const ParametroModel = require("../models/modulo_seguridad/parametros-model")
 function middlewareParamsSettings(req, res, next) {
            ParametroModel.getAll((err, rows) => {
                if(err){
                    res.status(404).json(
                        {
                            status:false,
                            code:404,
                            message:"Parametros no encontrados",
                            object:[],
                        }
                    )
                }else{
                    req.paramSettings = rows.rows
                    next()
                }
            }) 
}
module.exports = middlewareParamsSettings