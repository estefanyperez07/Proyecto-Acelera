"use strict";

var VentaModel = require("../../models/modulo_facturacion_inventario/venta-model"),
  VentaController = () => {};

VentaController.getAll = (req, res, next) => {
  VentaModel.getAll((err, rows) => {
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

VentaController.secuencia_enc_getone = (req, res, next) => {
  VentaModel.secuencia_enc_getone((err, rows) => {
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

VentaController.secuencia_det_getone = (req, res, next) => {
  VentaModel.secuencia_det_getone((err, rows) => {
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

VentaController.post = (req, res, next) => {
  let venta = {
    secuencia_enc: req.body.secuencia_enc,
    id_sucursal: req.body.id_sucursal,
    cod_sucursal: req.body.cod_sucursal,
    fecha: req.body.fecha,
    numero_cuenta: req.body.numero_cuenta,
    venta_grabada_15: req.body.venta_grabada_15,
    venta_grabada_18: req.body.venta_grabada_18,
    venta_exenta: req.body.venta_exenta,
    impuesto_15: req.body.impuesto_15,
    impuesto_18: req.body.impuesto_18,
    venta_total: req.body.venta_total,
    cai: req.body.cai,
    correlativo: req.body.correlativo,
    rtn: req.body.rtn,
    nombre_cliente: req.body.nombre_cliente,
    detalle: req.body.detalle,
    detalle_pago: req.body.detalle_pago,
    detalle_promo: req.body.detalle_promo,
    detalle_desc: req.body.detalle_desc,
  };

  console.log(JSON.stringify(venta));

  VentaModel.post(venta, (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${venta.cod_sucursal}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json(rows.rows);
      //res.redirect('/')
    }
  });
};

VentaController.delete = (venta) => {
  console.log(venta);

  VentaModel.delete(venta, (err, rows) => {
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

VentaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

VentaController.error404 = (req, res, next) => {
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

module.exports = VentaController;
