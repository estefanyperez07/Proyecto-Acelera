
var LoginModel = require('../../models/modulo_seguridad/registro-model'),
LoginController = () => {}

LoginController.login = (req, res, next) => {
	let usuario = {
        
        nombre_usuario : req.body.user,
       
        contrasena : req.body.pass,
        
	}

	console.log(usuario)

	LoginModel.login(usuario, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${usuario.id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			res.send('Success')
			//res.redirect('/')
		}
	})
}

module.exports = LoginController








