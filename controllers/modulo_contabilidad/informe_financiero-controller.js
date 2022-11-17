"use strict";

var InformeFinancieroModel = require("../../models/modulo_contabilidad/informe_financiero-model"),
  InformeFinancieroController = () => {};

InformeFinancieroController.getAll = (req, res, next) => {
  InformeFinancieroModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Lista de Informe Financiero",
        data: rows,
      };
      res.status(200).send(rows.rows);
      //res.render('index', locals)
    }
  });
};

InformeFinancieroController.getOne = (req, res, next) => {
  let id_informe_financiero = req.params.id_informe_financiero;
  console.log(id_informe_financiero);

  InformeFinancieroModel.getOne(id_informe_financiero, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_informe_financiero}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(520).json(err);
    } else {
      let locals = {
        title: "Editar informe financiero ",
        data: rows,
      };
      res.status(200).send(rows.rows[0]);
      //res.render('edit-movie', locals)
    }
  });
};

//FUNCIONA-------------------------
InformeFinancieroController.save = (req, res, next) => {
  let informefinanciero = {
    id_informe_financiero: req.params.id_informe_financiero,
    descripcion: req.body.descripcion,
  };

  console.log(informefinanciero);

  InformeFinancieroModel.save(informefinanciero, (err) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${informefinanciero.id_informe_financiero}`,
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

InformeFinancieroController.delete = (req, res, next) => {
  let id_informe_financiero = req.params.id_informe_financiero;
  console.log(id_informe_financiero);

  InformeFinancieroModel.delete(id_informe_financiero, (err, rows) => {
    console.log(err, "---", rows);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_informe_financiero}`,
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

/*InformeFinancieroController.addForm = (req, res, next) =>
  res.render("add-movie", { title: "Agregar informe financiero" });

InformeFinancieroController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso No Encontrado",
      error: error,
    };

  error.status = 404;

  res.render("error", locals);

  next();
};*/

module.exports = InformeFinancieroController;