"use strict";

var conn = require("../db-connection"),
  ArticuloModel = () => {};

ArticuloModel.getAll = (cb) =>
  conn.query("SELECT * FROM ft_articulo_getall()", cb);

ArticuloModel.getAllByCategoria = (id_categoria, cb) =>
  conn.query(
    `SELECT 		a.id_articulo
			,a.cod_articulo
			,a.descripcion
			,a.descripcion_corta
			,a.id_impuesto
			,c.tipo
			,c.porcentaje
			,a.id_categoria
			,a.precio
			,a.codigo_barra
  FROM 		tbl_articulo a 
  inner join 	tbl_categoria b on a.id_categoria=b.id_categoria and b.activo='1'
  inner join 	tbl_impuesto c on a.id_impuesto=c.id_impuesto
  where 		a.activo = '1'
  and			a.id_categoria = $1
  and   a.tipo = 'V' `,
    [id_categoria],
    cb
  );

ArticuloModel.getAllActive = (cb) =>
  conn.query(
    `SELECT 		a.id_articulo
			,a.cod_articulo
			,a.descripcion
			,a.descripcion_corta
			,a.id_impuesto
			,c.tipo
			,c.porcentaje
			,a.id_categoria
			,a.precio
			,a.codigo_barra
  FROM 		tbl_articulo a 
  inner join 	tbl_categoria b on a.id_categoria=b.id_categoria and b.activo='1'
  inner join 	tbl_impuesto c on a.id_impuesto=c.id_impuesto
  where 		a.activo = '1'
  and			b.activo = '1'
  and   a.tipo = 'V' `,
    cb
  );

ArticuloModel.getOne = (cod, cb) =>
  conn.query("SELECT * FROM ft_articulo_getone($1)", [cod], cb);

ArticuloModel.save = (data, cb) => {
  conn.query(
    "SELECT * FROM ft_articulo_getone($1)",
    [data.cod_articulo],
    (err, rows) => {
      console.log(`Número de registros: ${rows.rows.length}`);
      console.log(`Número de registros: ${err}`);

      if (err) {
        return err;
      } else {
        return rows.rows.length === 1
          ? conn.query(
              "call prc_articulo_update ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                data.cod_articulo,
                data.tipo,
                data.descripcion_articulo,
                data.descripcion_corta,
                data.id_impuesto,
                data.id_categoria,
                data.precio,
                data.id_unidad_venta,
                data.id_socio_negocio,
                data.id_unidad_compra,
                data.codigo_barra,
                data.id_unidad_medida,
                data.activo,
                data.modificado_por,
                data.fecha_modificacion,
              ],
              cb
            )
          : conn.query(
              "call prc_articulo_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
              [
                data.cod_articulo,
                data.tipo,
                data.descripcion_articulo,
                data.descripcion_corta,
                data.id_impuesto,
                data.id_categoria,
                data.precio,
                data.id_unidad_venta,
                data.id_socio_negocio,
                data.id_unidad_compra,
                data.codigo_barra,
                data.id_unidad_medida,
                data.activo,
                data.creado_por,
                data.fecha_creacion,
              ],
              cb
            );
      }
    }
  );
};

ArticuloModel.delete = (cod, cb) =>
  conn.query("call prc_articulo_delete ($1)", [cod], cb);

module.exports = ArticuloModel;
