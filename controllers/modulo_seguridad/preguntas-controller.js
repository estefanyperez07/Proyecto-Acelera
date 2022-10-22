'use strict'
var PreguntasModel = require('../../models/modulo_seguridad/preguntas-model'),
	PreguntasController = () => {}

	PreguntasController.getAll = (req, res, next) => {
	PreguntasModel.getAll((err, rows) => {
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
				title : 'Lista de Preguntas',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('index', locals)
		}
	})
}

PreguntasController.getOne = (req, res, next) => {
	let id_pregunta = req.params.id_pregunta
	console.log(id_pregunta)

	PreguntasModel.getOne(id_pregunta, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_pregunta}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar Pregunta',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

PreguntasController.save = (req, res, next) => {
	let pregunta = {
        id_pregunta : req.body.id_pregunta,
        pregunta : req.body.pregunta
	}

	console.log(pregunta)

	PreguntasModel.save(pregunta, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${pregunta.id_pregunta}`,
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

PreguntasController.delete = (req, res, next) => {
	let id_pregunta = req.params.id_pregunta
	console.log(id_pregunta)

	PreguntasModel.delete(id_pregunta, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_pregunta}`,
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

PreguntasController.error404 = (req, res, next) => {
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

module.exports = PreguntasController

