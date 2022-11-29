"use strict";

var EmpresaModel = require("../../models/modulo_facturacion_inventario/empresa-model"),
  EmpresaController = () => {};

EmpresaController.getAll = (req, res, next) => {
  EmpresaModel.getAll((err, rows) => {
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

EmpresaController.getOne = (req, res, next) => {
  EmpresaModel.getOne((err, rows) => {
    console.log(err, "---", rows);
    if (err) {
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

EmpresaController.save = (req, res, next) => {
  let empresa = {
    id_empresa: req.params.id_empresa,
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    rtn: req.body.rtn,
    logo1: req.body.logo1,
    logo2: req.body.logo2,
    logo3: req.body.logo3,
    logo4: req.body.logo4,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(empresa);

  EmpresaModel.save(empresa, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${empresa.cod_empresa}`,
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

EmpresaController.delete = (req, res, next) => {
  let cod_empresa = req.params.cod_sucursal;
  console.log(cod_empresa);

  EmpresaModel.delete(cod_empresa, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${cod_sucursal}`,
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

EmpresaController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

EmpresaController.error404 = (req, res, next) => {
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

module.exports = EmpresaController;
