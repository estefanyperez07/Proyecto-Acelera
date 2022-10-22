'use strict'

var EstadoModel = require('../../models/modulo_seguridad/estado-model'),
	EstadoController = () => {}

    //Obtener todos los registros
    EstadoController.getAll = (req, res, next) => {
    EstadoModel.getAll((err, rows) => {
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
                title : 'Lista de estados',
                data : rows
            }
            res.status(200).send(rows.rows)
            res.render('index', locals)
        }
    })
}

//Obtener un registro específico
EstadoController.getOne = (req, res, next) => {
	let id = req.params.id
	console.log(id)

	EstadoModel.getOne(id, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar estado',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

//Guardar registro
EstadoController.save = (req, res, next) => {
	let estado = {
        id : req.body.id,
        descripcion : req.body.descripcion
	}

	console.log(estado)

	EstadoModel.save(estado, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id: ${estado.id}`,
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

//Borrar registro
EstadoController.delete = (req, res, next) => {
	let id = req.params.id
	console.log(id)

	EstadoModel.delete(id, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id}`,
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

EstadoController.error404 = (req, res, next) => {
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

module.exports = EstadoController