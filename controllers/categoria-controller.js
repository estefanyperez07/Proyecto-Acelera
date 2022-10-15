'use strict'

var CategoriaModel = require('../models/categoria-model'),
	CategoriaController = () => {}

	CategoriaController.getAll = (req, res, next) => {
	CategoriaModel.getAll((err, rows) => {
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
				title : 'Lista de Películas',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('index', locals)
		}
	})
}

CategoriaController.getOne = (req, res, next) => {
	let id_categoria = req.params.id_categoria
	console.log(id_categoria)

	CategoriaModel.getOne(id_categoria, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_categoria}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar Película',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

CategoriaController.save = (req, res, next) => {
	let categoria = {
		id_categoria : req.body.id_categoria,
		descripcion : req.body.descripcion,
		creado_por : req.body.creado_por,
		fecha_creacion : req.body.fecha_creacion,
		modificado_por : req.body.modificado_por,
		fecha_modificacion : req.body.fecha_modificacion,
		activo : req.body.activo
	}

	console.log(categoria)

	CategoriaModel.save(categoria, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${categoria.id_categoria}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			//res.render('error', locals)
		}
		else
		{
			res.send('Success')
			//res.redirect('/')
		}
	})
}

CategoriaController.delete = (req, res, next) => {
	let id_categoria = req.params.id_categoria
	console.log(id_categoria)

	CategoriaModel.delete(id_categoria, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_categoria}`,
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

CategoriaController.addForm = (req, res, next) => res.render('add-movie', { title : 'Agregar Película' })

CategoriaController.error404 = (req, res, next) => {
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

module.exports = CategoriaController