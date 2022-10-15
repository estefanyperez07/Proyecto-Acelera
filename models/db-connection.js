'use strict'

const { Client } = require('pg');
const conf = require('./db-conf');
const myConn = new Client(conf)

myConn.connect((err) => {
	return (err) ? console.log(`Error al Conectarse a postgres: ${err.stack}`) : console.log(`Conexión establecida con postgres en DB: ${myConn.database}`)
})

module.exports = myConn