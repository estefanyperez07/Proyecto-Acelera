'use strict'

var RolModel = require('../../models/modulo_seguridad/rol-model'),
	RolController = () => {}

    //Obtener todos los registros
    RolController.getAll = (req, res, next) => {
    RolModel.getAll((err, rows) => {
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
            //     title : 'Lista de roles',
            //     data : rows
            // }
            // res.status(200).send(rows.rows)
            // res.render('index', locals)
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

//Obtener un registro específico
RolController.getOne = (req, res, next) => {
	let id_rol = req.params.id_rol
	console.log(id_rol)

	RolModel.getOne(id_rol, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al buscar el registro con el id: ${id_rol}`,
				description : "Error de Sintaxis SQL",
				error : err
			}
			
			res.render('error', locals)
		}
		else
		{
			let locals = {
				title : 'Editar rol',
				data : rows
			}
			res.status(200).send(rows.rows)
			//res.render('edit-movie', locals)
		}
	})
}

//Guardar registro
RolController.save = (req, res, next) => {
	let rol = {
        id_rol : req.body.id_rol,
        rol : req.body.rol,
        descripcion : req.body.descripcion,
        creado_por : req.body.creado_por,
        fecha_creacion : req.body.fecha_creacion,
        modificado_por : req.body.modificado_por,
        fecha_modificacion : req.body.fecha_modificacion
	}

	console.log(rol)

	RolModel.save(rol, (err) => {
		if(err)
		{
			let locals = {
				title : `Error al salvar el registro con el id_rol: ${rol.id_rol}`,
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
RolController.delete = (req, res, next) => {
	let id_rol = req.params.id_rol
	console.log(id_rol)

	RolModel.delete(id_rol, (err, rows) => {
		console.log(err, '---', rows)
		if(err)
		{
			let locals = {
				title : `Error al eliminar el registro con el id: ${id_rol}`,
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

RolController.error404 = (req, res, next) => {
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

module.exports = RolController