"use strict";

var CatalogoModel = require("../../models/modulo_contabilidad/catalogo_cuentas-model"),
  CatalogoController = () => {};

CatalogoController.getAll = (req, res, next) => {
  CatalogoModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Catalogo cuenta",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

CatalogoController.getOne = (req, res, next) => {
  let id_cuenta = req.params.id_cuenta;
  console.log(id_cuenta);

  CatalogoModel.getOne(id_cuenta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_cuenta}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar Catalogo Cuentas",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

CatalogoController.save = (req, res, next) => {
  let catalogo = {
    id_cuenta: req.body.id_cuenta,
    id_usuario: req.body.id_usuario,
    codigo_cuenta: req.body.codigo_cuenta,
    nombre_cuenta: req.body.nombre_cuenta,
    id_categoria: req.body.id_categoria,
    id_destino_cuenta: req.body.id_destino_cuenta,
  };

  console.log(catalogo);

  CatalogoModel.save(catalogo, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${catalogo.id_cuenta}`,
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

CatalogoController.delete = (req, res, next) => {
  let id_cuenta = req.params.id_cuenta;
  console.log(id_cuenta);

  CatalogoModel.delete(id_cuenta, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_cuenta}`,
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

CatalogoController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

CatalogoController.error404 = (req, res, next) => {
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

module.exports = CatalogoController;