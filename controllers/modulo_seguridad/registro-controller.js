'use strict'

var UsuarioModel = require('../../models/modulo_seguridad/registro-model'),
	UsuarioController = () => {}

	UsuarioController.getAll = (req, res, next) => {
	UsuarioModel.getAll((err, rows) => {
		if(err)
		{
			let locals = {
				title : 'Error al consultar la base de datos',
				description : 'Error de Sintaxis SQL',
				error : err
			}

			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Lista de Usuarios',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('index', locals)
		}
	})
}

UsuarioController.getOne = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	console.log(id_usuario)

	UsuarioModel.getOne(id_usuario, (err, rows) => {
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

UsuarioController.save = (req, res, next) => {
	let usuario = {
        id_usuario : req.body.id_usuario,
        usuario : req.body.usuario,
        nombre_usuario : req.body.nombre_usuario,
        estado_usuario : req.body.estado_usuario,
        contrasena : req.body.contrasena,
        id_rol : req.body.id_rol,
        fecha_ultima_conexion : req.body.fecha_ultima_conexion,
        preguntas_contestadas : req.body.preguntas_contestadas,
        primer_ingreso : req.body.primer_ingreso,
        fecha_vencimiento : req.body.fecha_vencimiento,
        correo_electronico : req.body.correo_electronico,
        creado_por : req.body.creado_por,
        fecha_creacion : req.body.fecha_creacion,
        modificado_por : req.body.modificado_por,
        fecha_modificacion : req.body.fecha_modificacion,
        intentos_login : req.body.intentos_login
	}

	console.log(usuario)

	UsuarioModel.save(usuario, (err) => {
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

UsuarioController.delete = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	console.log(id_usuario)

	UsuarioModel.delete(id_usuario, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_usuario}`,
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

UsuarioController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}

module.exports = UsuarioController