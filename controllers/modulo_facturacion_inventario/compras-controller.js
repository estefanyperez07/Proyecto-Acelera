"use strict";

var ComprasModel = require("../../models/modulo_facturacion_inventario/compras-model"),
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
  let fecha = req.body.fecha;
  console.log(fecha);
  ComprasModel.comprasPorFecha(fecha, (err, rows) => {
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

  console.log(compras);

  ComprasModel.post(compras, (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${compras}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json(rows.rows[0].fcn_compras_enca_insert[0]);
      //res.redirect('/')
    }
  });
};

ComprasController.delete = (venta) => {
  console.log(venta);

  ComprasModel.delete(venta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${venta}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).send("Success");
      //res.redirect('/')
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
