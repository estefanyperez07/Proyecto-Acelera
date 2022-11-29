'use strict'

var ObjetoModel = require('../../models/modulo_seguridad/objeto-model'),
	ObjetoController = () => {};

	ObjetoController.getAll = (req, res, next) => {
	ObjetoModel.getAll((err, rows) => {
		if(err)
		{
			let locals = {
				title : 'Error al consultar la base de datos',
				description : 'Error de Sintaxis SQL',
				error : err,
			};

			res.render('error', locals);
		}
		else
		{
			let locals = {
				title : 'Lista de objetos',
				data : rows,
			};
			res.status(200).send(rows.rows);
			//res.render('index', locals)
		}
	});
};

ObjetoController.getOne = (req, res, next) => {
	let objeto = req.params.objeto;
	console.log(objeto);

	ObjetoModel.getOne(objeto, (err, rows) => {
		console.log(err, '---', rows);
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${objeto}`,
				description : "Error de Sintaxis SQL",
				error : err,
			};
			
			res.render('error', locals);
		}
		else
		{
			let locals = {
				title : 'Editar obejto',
				data : rows,
			};
			res.status(200).send(rows.rows);
			//res.render('edit-movie', locals)
		}
	});
};

ObjetoController.save = (req, res, next) => {
	let objeto = {
        id_objeto : req.params.id_objeto,
        objeto : req.body.objeto,
        descripcion : req.body.descripcion,
        tipo_objeto : req.body.tipo_objeto,
       
	};

	console.log(objeto);

	ObjetoModel.save(objeto, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${objeto.id_objeto}`,
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

ObjetoController.delete = (req, res, next) => {
	let id_objeto = req.params.id_objeto;
	console.log(id_objeto);

	ObjetoModel.delete(id_objeto, (err, rows) => {
		console.log(err, '---', rows);
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_objeto}`,
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

ObjetoController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
};

module.exports = ObjetoController;