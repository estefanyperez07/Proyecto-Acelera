'use strict'
var PreguntasUsuarioModel = require('../../models/modulo_seguridad/preg_usuario-model'),
	PreguntasUsuarioController = () => {};

	PreguntasUsuarioController.getAll = (req, res, next) => {
	PreguntasUsuarioModel.getAll((err, rows) => {
		if(err)
		{
			let locals = {
				title : 'Error al consultar la base de datos',
				description : 'Error de Sintaxis SQL',
				error : err,
			}

			res.render('error', locals);
		}
		else
		{
			let locals = {
				title : 'Lista de Preguntas Usuario',
				data : rows,
			}
			res.status(200).send(rows.rows);
			//res.render('index', locals)
		}
	})
}

PreguntasUsuarioController.getOne = (req, res, next) => {
	let  id_preguntas_usuario = req.params.id_preguntas_usuario;
	console.log(id_preguntas_usuario);

	PreguntasUsuarioModel.getOne(id_preguntas_usuario, (err, rows) => {
		console.log(err, '---', rows);
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_preguntas_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err,
			}
			
			res.render('error', locals);
		}
		else
		{
			let locals = {
				title : 'Editar Pregunta Usuario',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

PreguntasUsuarioController.save = (req, res, next) => {
	let pregunta_usuario = {
          //id_preguntas_usuario : req.body.id_preguntas_usuario,
		  id_usuario : Number(req.body.id_usuario),
		  id_pregunta : Number(req.body.id_pregunta),
		  respuesta : req.body.respuesta
 

	};

	console.log(pregunta_usuario);

	PreguntasUsuarioModel.save(pregunta_usuario, (err,rows) => {
		if(err)
		{
			res.status(400).json({
				status: false,
				code: 400,
				message: "Ha ocurrido un error al crear preguntas",
				object:[],
			  });
		}
		else
		{
			res.status(200).json({
				status: true,
				code: 200,
				message: "Información encontrada exitosamente",
				object: rows.rows[0],
			  });
		}
	})
}

PreguntasUsuarioController.update = (req, res, next) => {
	let pregunta_usuario = {
		id_preguntas_usuario : req.params.id_preguntas_usuario,
		id_usuario : req.body.id_usuario,
		id_pregunta : req.body.id_pregunta,
		respuesta : req.body.respuesta,
 

	};

	console.log(pregunta_usuario);

	PreguntasUsuarioModel.update(pregunta_usuario, (err,rows) => {
		if(err)
		{
			res.status(400).json({
				status: false,
				code: 400,
				message: "Ha ocurrido un error al actualizar la respuesta",
				object:[],
			  });
		}
		else
		{
			res.status(200).json({
				status: true,
				code: 200,
				message: "Información actualizada exitosamente",
				object: rows.rows[0],
			  });
		}
	})
}

PreguntasUsuarioController.delete = (req, res, next) => {
	let id_preguntas_usuario = req.params.id_preguntas_usuario;
	console.log( id_preguntas_usuario);

	PreguntasUsuarioModel.delete(id_preguntas_usuario, (err, rows) => {
		console.log(err, '---', rows);
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_preguntas_usuario}`,
				description : "Error de Sintaxis SQL",
				error : err,
			};

			res.render('error', locals);
		}
		else
		{
			res.send('Success');
			//res.redirect('/')
		}
	});
};

PreguntasUsuarioController.error404 = (req, res, next) => {
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

module.exports = PreguntasUsuarioController;

