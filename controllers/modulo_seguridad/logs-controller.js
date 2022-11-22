'use strict'

var LogsModel = require('../../models/modulo_seguridad/logs-model'),
	LogsController = () => {}

	LogsController.getAll = (req, res, next) => {
	
		LogsModel.getAll((err, rows) => {
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
			// 	title : 'Lista de Usuarios',
			// 	data : rows
			// }
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Información encontrada exitosamente",
					object:rows.rows,
				}
			)
			//res.render('index', locals)
		}
	})
}

LogsController.getOne = (req, res, next) => {
	let id_usuario = req.params.id_usuario
	// console.log(id_usuario)

	LogsModel.getOne(id_usuario, (err, row) => {
		// console.log(err, '---', row)
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
			// let locals = {
			// 	title : 'Editar Usuario',
			// 	data : row
			// }
			console.log(row.rows)
			// res.status(200).send(rows.rows)
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Información encontrada exitosamente",
					object:row.rows[0],
				}
			)
			//res.render('edit-movie', locals)
		}
	})
}

LogsController.save = (req, res, next) => {
	let data = {
		fecha:req.body.fecha,
		id_usuario:req.body.id_usuario,
		accion:req.body.accion,
		descripcion:req.body.descripcion,
	}
	console.log(data)

	LogsModel.save(data, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${usuario.id_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err
			}

			res.render('error', locals)
		}
		else{
			res.status(200).json(
				{
					status:true,
					code:200,
					message:"Información guardada exitosamente",
					object:[],
				}
			)
		}
	})
}


module.exports = LogsController