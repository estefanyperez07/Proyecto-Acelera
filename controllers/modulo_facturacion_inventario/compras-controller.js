"use strict";

var ComprasModel = require("../../models/modulo_facturacion_inventario/compras-model"),
  LibroEncabezadoModel = require("../../models/modulo_contabilidad/librodiarioencabezado-model"),
  ComprasController = () => {};

ComprasController.getAll = (req, res, next) => {
  ComprasModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

ComprasController.comprasPorFecha = (req, res, next) => {
  let fechas = {
    fecha_inicial: req.body.fecha_inicial,
    fecha_final: req.body.fecha_final,
  };
  console.log(fechas);
  ComprasModel.comprasPorFecha(fechas, (err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };
      let venta = rows.rows;
      res.status(200).send(rows.rows);
    }
  });
};

ComprasController.detallePorEncabezado = (req, res, next) => {
  let enc = req.params.enc;
  console.log(enc);
  ComprasModel.detallePorEncabezado(enc, (err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };
      let venta = rows.rows;
      res.status(200).send(rows.rows[0].ft_json_compras[0]);
    }
  });
};

ComprasController.jsonAsientoCompras = (req, res, next) => {
  let enc = req.params.enc;
  console.log(enc);
  ComprasModel.jsonAsientoCompras(enc, (err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Películas",
        data: rows,
      };
      let venta = rows.rows;
      res.status(200).send(rows.rows[0].ft_json_compras_asiento);
    }
  });
};

ComprasController.secuencia_enc_getone = (req, res, next) => {
  ComprasModel.secuencia_enc_getone((err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_sucursal}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar Película",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

ComprasController.secuencia_det_getone = (req, res, next) => {
  ComprasModel.secuencia_det_getone((err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${cod_sucursal}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar Película",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

ComprasController.post = (req, res, next) => {
  let responseAsiento = null;
  let responsePost = null;
  let secuencia_enc = null;
  let asiento = null;
  let monto_debe_enc = null;
  let monto_haber_enc = null;
  //Inicio Objeto Libro Diario
  let librodiarioencabezado = {
    id_estado: req.body.id_estado,
    descripcion: req.body.referencia,
    fecha: req.body.fecha,
    monto_debe: null,
    monto_haber: null,
    id_usuario: req.body.id_usuario,
    detalle: [],
  };
  //Fin Objeto Libro Diario
  let compras = {
    secuencia_enc: req.body.secuencia_enc,
    id_socio_negocio: req.body.id_socio_negocio,
    fecha: req.body.fecha,
    referencia: req.body.referencia,
    monto_total: req.body.monto_total,
    monto_impuesto_total: req.body.monto_impuesto_total,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
    id_usuario: req.body.id_usuario,
    id_centro_costo: req.body.id_centro_costo,
    detalle: req.body.detalle,
  };

  //console.log(compras);

  ComprasModel.post(compras, (err, rows) => {
    if (err) {
      res.status(520).json(err);
    } else {
      responsePost = rows.rows[0].fcn_compras_enca_insert[0];
      secuencia_enc = rows.rows[0].fcn_compras_enca_insert[0].secuencia_enc;
      //console.log(secuencia_enc);
      //console.log("linea 184", responsePost);
      //res.status(200).json(rows.rows[0].fcn_compras_enca_insert[0]);
      ComprasModel.jsonAsientoCompras(secuencia_enc, (err, rows) => {
        if (err) {
          res.status(520).json(err);
        } else {
          responseAsiento = rows.rows[0].ft_json_compras_asiento;
          console.log("responseAsiento", responseAsiento);
          responseAsiento.forEach(function (asiento) {
            monto_debe_enc += asiento.monto_debe;
            monto_haber_enc += asiento.monto_haber;
            librodiarioencabezado.detalle.push({
              id_subcuenta: asiento.id_subcuenta,
              id_estado: 1,
              parcial: 0,
              monto_debe: asiento.monto_debe,
              monto_haber: asiento.monto_haber,
              sinopsis: "",
              id_sucursal: null,
              id_centro_costo: compras.id_centro_costo,
            });
          });
          //console.log("responsePost", responsePost);
          console.log(monto_debe_enc, monto_haber_enc);
          librodiarioencabezado.id_estado = 1;
          librodiarioencabezado.monto_debe = monto_debe_enc;
          librodiarioencabezado.monto_haber = monto_haber_enc;
          console.log(librodiarioencabezado);
          //res.status(200).json(responsePost);
          LibroEncabezadoModel.post(librodiarioencabezado, (err, rows) => {
            if (err) {
              res.status(520).json(err);
            } else {
              res.status(200).json(responsePost);
            }
          });
        }
      });
    }
  });
};

ComprasController.anular = (req, res, next) => {
  let enc = req.params.enc;

  ComprasModel.anular(enc, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
    }
  });
};

ComprasController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

ComprasController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso No Encontrado",
      error: error,
    };

  error.status = 404;

  res.render("error", locals);

  next();
};

module.exports = ComprasController;
