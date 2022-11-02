"use strict";

var ListaMaterialesModel = require("../../models/modulo_facturacion_inventario/lista_materiales-model"),
  ListaMaterialesController = () => {};

ListaMaterialesController.getAll = (req, res, next) => {
  ListaMaterialesModel.getAll((err, rows) => {
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

ListaMaterialesController.getOne = (req, res, next) => {
  let id_articulo_padre = req.body.id_articulo_padre;
  let id_articulo_hijo = req.body.id_articulo_hijo;
  console.log(id_articulo_padre, id_articulo_hijo);

  ListaMaterialesModel.getOne(
    id_articulo_padre,
    id_articulo_hijo,
    (err, rows) => {
      console.log(err, "---", rows);
      if (err) {
        let locals = {
          title: `Error al buscar el registro con el id: ${id_articulo_padre}`,
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
    }
  );
};
ListaMaterialesController.padreGetAll = (req, res, next) => {
  let id_articulo_padre = req.params.id_articulo_padre;
  console.log(id_articulo_padre);

  ListaMaterialesModel.padreGetAll(id_articulo_padre, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_articulo_padre}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar Película",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('edit-movie', locals)
    }
  });
};

ListaMaterialesController.save = (req, res, next) => {
  let lista_materiales = {
    id_articulo_padre: req.body.id_articulo_padre,
    id_articulo_hijo: req.body.id_articulo_hijo,
    cantidad: req.body.cantidad,
    comentario: req.body.comentario,
    creado_por: req.body.creado_por,
    fecha_creacion: req.body.fecha_creacion,
    modificado_por: req.body.modificado_por,
    fecha_modificacion: req.body.fecha_modificacion,
  };

  console.log(lista_materiales);

  ListaMaterialesModel.save(lista_materiales, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${lista_materiales.id_articulo_padre}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      res.status(200).json("Success");
      //res.redirect('/')
    }
  });
};

ListaMaterialesController.delete = (req, res, next) => {
  let id_articulo_padre = req.body.id_articulo_padre;
  let id_articulo_hijo = req.body.id_articulo_hijo;
  console.log(id_articulo_padre, id_articulo_hijo);

  ListaMaterialesModel.delete(
    id_articulo_padre,
    id_articulo_hijo,
    (err, rows) => {
      console.log(err, "---", rows);
      if (err) {
        let locals = {
          title: `Error al eliminar el registro con el id: ${id_articulo_padre}`,
          description: "Error de Sintaxis SQL",
          error: err,
        };

        res.status(520).json(err);
      } else {
        res.status(200).json("Success");
        //res.redirect('/')
      }
    }
  );
};

ListaMaterialesController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar Película" });

ListaMaterialesController.error404 = (req, res, next) => {
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

module.exports = ListaMaterialesController;
