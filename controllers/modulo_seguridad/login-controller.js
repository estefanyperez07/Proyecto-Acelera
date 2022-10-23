
var LoginModel = require('../../models/modulo_seguridad/login-model'),
  LoginController = () => {}

  LoginController.getAll = (req, res, next) => {
    LoginModel.getAll((err, rows) => {
      if(err)
      {
        let locals = {
          title : 'Error al consultar la base de datos',
          description : 'Error de Sintaxis SQL',
          error : err
        }
  
        res.render('error', locals)
      }
      else
      {
        let locals = {
          title : 'Lista de Usuarios',
          data : rows
        }
        res.status(200).send(rows.rows)
        //res.render('index', locals)
      }
    })
  }
  


    LoginController.getOne = (req, res, next) => {
    let login = {
      user : req.body.usuario,
      pass : req.body.pass,
    }

    console.log(login)
  
    LoginModel.getOne(login, (err, rows) => {
      console.log(err, '---', rows)
      if(err)
      {
        let locals = {
          title : 'Error al buscar el registro con el id: ${login.id_usuario}',
          description : "Error de Sintaxis SQL",
          error : err
        }
        
        res.render('error', locals)
      }
      else
      {
        let locals = {
          title : 'Editar Usuario',
          data : rows
        }
        res.status(200).send(rows.rows)
        //res.render('edit-movie', locals)
      }
    })
  }