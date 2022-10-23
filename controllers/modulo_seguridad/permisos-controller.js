'use strict'

var PermisosModel = require('../../models/modulo_seguridad/permisos-model'),
	PermisosController = () => {}

	PermisosController.getAll = (req, res, next) => {
	PermisosModel.getAll((err, rows) => {
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
				title : 'Lista de permisos',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('index', locals)
		}
	})
}

PermisosController.getOne = (req, res, next) => {
	let id_permiso = req.params.id_permiso
	console.log(id_permiso)

	PermisosModel.getOne(id_permiso, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_permiso}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar permiso',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

PermisosController.save = (req, res, next) => {
	let permiso = {

        id_permiso : req.body.id_permiso,
        id_rol : req.body.id_rol,
        id_objeto : req.body.id_objeto,
        permiso_insercion : req.body.permiso_insercion,
        permiso_eliminacion : req.body.permiso_eliminacion,
        permiso_actualizacion : req.body.permiso_actualizacion,
        permiso_consultar : req.body.permiso_consultar,
        creado_por : req.body.creado_por,
        fecha_creacion : req.body.fecha_creacion,
        modificado_por : req.body.modificado_por,
        fecha_modificacion : req.body.fecha_modificacion
	}

	console.log(permiso)

	PermisosModel.save(permiso, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${permiso.id_permiso}`,
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

PermisosController.delete = (req, res, next) => {
	let id_permiso = req.params.id_permiso
	console.log(id_permiso)

	PermisosModel.delete(id_permiso, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_permiso}`,
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

PermisosController.error404 = (req, res, next) => {
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

module.exports = PermisosController