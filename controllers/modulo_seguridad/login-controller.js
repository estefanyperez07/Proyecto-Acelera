
var LoginModel = require('../../models/modulo_seguridad/login-model'),
LoginController = () => {}

LoginController.getOne = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	console.log(id_usuario)

	LoginModel.getOne(id_usuario, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar Usuario',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

LoginController.login = (req, res, next) => {
	let usuario = {
        nombre_usuario : req.body.nombre_usuario, 
        contrasena : req.body.contrasena,    
	}

	console.log(usuario)

	LoginModel.login(usuario, (err,rows) => {
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
			res.status(200).send(rows.rows)
			//res.send('Success')
			//res.redirect('/')
		}
	})
}

module.exports = LoginController








