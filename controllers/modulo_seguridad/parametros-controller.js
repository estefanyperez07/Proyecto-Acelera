'use strict'

var ParametroModel = require('../../models/modulo_seguridad/parametros-model'),
	ParametroController = () => {}

	ParametroController.getAll = (req, res, next) => {
	ParametroModel.getAll((err, rows) => {
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
			// let locals = {
			// 	title : 'Lista de Parámetros',
			// 	data : rows
			// }
			// res.status(200).send(rows.rows)
			// //res.render('index', locals)
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Información encontrada exitosamente",
					object:rows.rows,
				}
			)
		}
	})
}

ParametroController.getOne = (req, res, next) => {
	let id_parametro = req.params.id_parametro
	console.log(id_parametro)

	ParametroModel.getOne(id_parametro, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_parametro}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar Parámetro',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

ParametroController.save = (req, res, next) => {
	let parametro = {
        id_parametro : req.body.id_parametro,
        parametro : req.body.parametro,
        valor : req.body.valor,
        creado_por : req.body.creado_por,
        fecha_creacion : req.body.fecha_creacion,
        modificado_por : req.body.modificado_por,
        fecha_modificacion : req.body.fecha_modificacion,
        
	}

	console.log(parametro)

	ParametroModel.save(parametro, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${parametro.id_parametro}`,
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

ParametroController.delete = (req, res, next) => {
	let id_parametro = req.params.id_parametro
	console.log(id_parametro)

	ParametroModel.delete(id_parametro, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_parametro}`,
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

ParametroController.error404 = (req, res, next) => {
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

module.exports = ParametroController