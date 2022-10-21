'use strict'

var express = require('express'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	restFul = require('express-method-override')('_method'),
	routes = require('./routes/router'),
	faviconURL = `${__dirname}/public/img/node-favicon.png`,
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 3001),
	app = express()

app
	.set('views', viewDir)
	.set('view engine', 'jade')
	.set('port', port)

	.use( favicon(faviconURL) )
	// parse application/json
	.use( bodyParser.json() )
	// parse application/x-www-form-urlencoded
	.use( bodyParser.urlencoded({extended: false}) )
	.use(restFul)
	.use( morgan('dev') )
	.use(publicDir)
	.use(routes)
	.use(function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "localhost")
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  		next()
})

module.exports = app
