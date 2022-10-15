'use strict'

var CategoriaController = require('../controllers/categoria-controller'),
	express = require('express'),
	router = express.Router()

router
	.get('/categoria/getall', CategoriaController.getAll)
	.get('/agregar', CategoriaController.addForm)
	.post('/', CategoriaController.save)
	.get('/categoria/getone/:id_categoria', CategoriaController.getOne)
	.put('/categoria/actualizar-insertar/:id_categoria', CategoriaController.save)
	.delete('/categoria/eliminar/:id_categoria', CategoriaController.delete)
	.use(CategoriaController.error404)
	
module.exports = router