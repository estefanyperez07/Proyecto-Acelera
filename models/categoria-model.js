'use strict'

var conn = require('./db-connection'),
	CategoriaModel = () => {}

CategoriaModel.getAll = (cb) => conn.query('SELECT * FROM tbl_categoria', cb)

CategoriaModel.getOne = (id, cb) => conn.query('SELECT * FROM tbl_categoria WHERE id_categoria = $1', [id], cb)

CategoriaModel.save = (data, cb) => {
	
	conn.query('SELECT * FROM tbl_categoria WHERE id_categoria = $1', [data.id_categoria], (err, rows) => {
		console.log(`Número de registros: ${rows.rows.length}`)
		console.log(`Número de registros: ${err}`)

		if(err)
		{
			return err
		}
		else
		{
			return ( rows.rows.length === 1 ) 
					? conn.query('UPDATE tbl_categoria set descripcion=$2, creado_por=$3, fecha_creacion=$4, modificado_por=$5,fecha_modificacion=$6,activo=$7 WHERE id_categoria = $1', [data.id_categoria,data.descripcion,data.creado_por,data.fecha_creacion,data.modificado_por,data.fecha_modificacion,data.activo], cb) 
					: conn.query('INSERT INTO tbl_categoria (id_categoria,descripcion,creado_por,fecha_creacion,modificado_por,fecha_modificacion,activo) values ($1,$2,$3,$4,$5,$6,$7)', [data.id_categoria,data.descripcion,data.creado_por,data.fecha_creacion,data.modificado_por,data.fecha_modificacion,data.activo], cb)
		}
	})
}

CategoriaModel.delete = (id, cb) => conn.query('DELETE FROM tbl_categoria WHERE id_categoria = $1', [id], cb)

module.exports = CategoriaModel