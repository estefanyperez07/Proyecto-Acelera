"use strict";

var EstadoUserModel = require("../../models/modulo_seguridad/estado-model"),
  EstadoUserController = () => {};

//Obtener todos los registros
EstadoUserController.getAll = (req, res, next) => {
  EstadoUserModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      res.status(200).json({
        status: true,
        code: 200,
        message: "Información encontrada exitosamente",
        object: rows.rows,
      });
    }
  });
};

//Obtener un registro específico
EstadoUserController.getOne = (req, res, next) => {
  let id = req.params.id;
  console.log(id);

  EstadoUserModel.getOne(id, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      res.status(200).json({
        status: true,
        code: 200,
        message: "Información encontrada exitosamente",
        object: rows.rows,
      });
      // let locals = {
      // 	title : 'Editar estado',
      // 	data : rows
      // }
      // res.status(200).send(rows.rows)
      //res.render('edit-movie', locals)
    }
  });
};

//Guardar registro
EstadoUserController.save = (req, res, next) => {
  let estado = {
    id: req.body.id,
    descripcion: req.body.descripcion,
  };

  console.log(estado);

  EstadoUserModel.save(estado, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${estado.id}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

//Borrar registro
EstadoUserController.delete = (req, res, next) => {
  let id = req.params.id;
  console.log(id);

  EstadoUserModel.delete(id, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      res.send("Success");
      //res.redirect('/')
    }
  });
};

EstadoUserController.error404 = (req, res, next) => {
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

module.exports = EstadoUserController;
