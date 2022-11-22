"use strict";
// var newOTP = require("otp-generators");
// var md5 = require("md5");
// var filterParam =require('../../utils/filterParam.util')

const filterParamUtil = require("../../utils/filterParam.util");
var UsuarioModel = require("../../models/modulo_seguridad/registro-model"),
  UsuarioController = () => {};

const nodemailer = require("nodemailer");


// const JWT_SECRET = "PR0Y3CT0_M0DUL0_D3_S3GUR1D4D";
// const timeExpired = "24h";


UsuarioController.validateUserState = (req, res, next) => {
  let id = req.body.id_usuario;
  UsuarioModel.validateUserState(id, (err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      // let locals = {
      // 	title : 'Lista de Usuarios',
      // 	data : rows
      // }
      res.status(200).json({
        status: true,
        code: 200,
        message: "Información encontrada exitosamente",
        object: rows.rows[0],
      });
      //res.render('index', locals)
    }
  });
};

UsuarioController.getAll = (req, res, next) => {
  UsuarioModel.getAll((err, rows) => {
    if (err) {
      let locals = {
        title: "Error al consultar la base de datos",
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      // let locals = {
      // 	title : 'Lista de Usuarios',
      // 	data : rows
      // }
      res.status(200).json({
        status: true,
        code: 200,
        message: "Información encontrada exitosamente",
        object: rows.rows,
      });
      //res.render('index', locals)
    }
  });
};

UsuarioController.getOne = (req, res, next) => {
  let id_usuario = req.params.id_usuario;
  // console.log(id_usuario)

  UsuarioModel.getOne(id_usuario, (err, row) => {
    // console.log(err, '---', row)
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      // let locals = {
      // 	title : 'Editar Usuario',
      // 	data : row
      // }
      console.log(row.rows);
      // res.status(200).send(rows.rows)
      res.status(200).json({
        status: true,
        code: 200,
        message: "Información encontrada exitosamente",
        object: row.rows[0],
      });
      //res.render('edit-movie', locals)
    }
  });
};

UsuarioController.updateUserState = (req, res, next) => {
  let id_usuario = req.body.id_usuario;
  let preguntas_contestadas = req.body.preguntas_contestadas;
  // console.log(id_usuario)

  UsuarioModel.updateUserState(id_usuario,preguntas_contestadas, (err, row) => {
    // console.log(err, '---', row)
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
      // let locals = {
      // 	title : 'Editar Usuario',
      // 	data : row
      // }
      console.log(row.rows);
      // res.status(200).send(rows.rows)
      res.status(200).json({
        status: true,
        code: 200,
        message: "Información actualizada exitosamente",
        object: row.rows[0],
      });
      //res.render('edit-movie', locals)
    }
  });
};

UsuarioController.edit =  (req, res, next) => {
  let id_usuario = req.params.id_usuario
//   let usuario=req.body.usuario
  //validando que el usaurio no exista
//    UsuarioModel.getOne(usuario,id_usuario, (err, row) => {
// 	if (err) {
// 		res.status(400).json({
// 			status: false,
// 			code: 400,
// 			message: "ah ocurrido un erroe al consultar",
// 			object: [],
// 		  });
// 	}
// 	console.log("id_usuario",id_usuario)
// 	console.log("usuario",usuario)
// 	console.log("row",row.rows[0])

// 	// usaurio existe y e sdistinto de id de usuario)
// 	if(row.rows.length === 1){
// 	 	res.status(400).json({
// 			status: false,
// 			code: 303,
// 			message: "Este usaurio ya existe en BD",
// 			object: [],
// 		  });
// 	}
// });

let data = {
//   usuario:req.body.usuario,
  nombre_usuario: req.body.nombre_usuario,
  estado_usuario: req.body.estado_usuario,
  id_rol: req.body.id_rol,
  modificado_por: req.body.modificado_por,
  id_usuario: id_usuario,
};

UsuarioModel.updateUserbyId(data, (err, row) => {
  // console.log(err, '---', row)
  if (err) {
	let locals = {
	  title: `Error al buscar el registro con el id: ${id_usuario}`,
	  description: "Error de Sintaxis SQL",
	  error: err,
	};

	res.render("error", locals);
  } else {
	// let locals = {
	// 	title : 'Editar Usuario',
	// 	data : row
	// }
	console.log(row.rows);
	// res.status(200).send(rows.rows)
	res.status(200).json({
	  status: true,
	  code: 201,
	  message: "Información actualizada exitosamente",
	  object: row.rows,
	});
	//res.render('edit-movie', locals)
  }
});


};

UsuarioController.save = (req, res, next) => {
	const { paramSettings } = req;
	const paramSettingCorreo = filterParamUtil(paramSettings, "ADMIN_CORREO");
	const paramSettingPass = filterParamUtil(paramSettings, "ADMIN_CPASS");
	const paramSettingCompany = filterParamUtil(paramSettings, "SYS_NOMBRE");
	const paramSettingPhone = filterParamUtil(paramSettings, "SYS_PHONE");
	const paramSettingUser = filterParamUtil(paramSettings, "ADMIN_CUSER");
	const paramVigenciaUser = filterParamUtil(paramSettings, "ADMIN_VIGENCIA");
	
	const paramUrlPanel = filterParamUtil(paramSettings, "URL_PANEL");
	var urlPanel = paramUrlPanel.valor;	
	  
	const mailConfigSender = {
	  user: paramSettingCorreo.valor,
	  pass: paramSettingPass.valor,
	};

  // console.log('req.usuario',req.usuario)
  let otp = req.body.otp
//   let otp = newOTP.generate(8, {
//     alphabets: true,
//     upperCase: true,
//     specialChar: true,
//   });

  // var x = Math.floor(Math.random() * (100 - 1) + 1);
  // let name_user=(req.body.nombre_usuario).toString()
  // name_user= name_user.replace(/\s/g,'')
  // name_user= name_user.toUpperCase()
  // name_user= name_user+""+x

  // let nombreDeUsuario=req.body.nombre_usuario
  let usuario = {
    usuario: String(req.body.usuario).toUpperCase(),
    nombre_usuario: String(req.body.nombre_usuario).toUpperCase(),
    contrasena: req.body.contrasena,
    // contrasena: md5(otp),
    id_rol: req.body.id_rol || 1,
    primer_ingreso: 0,
    correo_electronico: req.body.correo_electronico,
    creado_por: req.body.creado_por,
    fecha_creacion: new Date(),
    intentos_login: 0,
    estado_usuario: 2,
    paramVigencia: paramVigenciaUser.valor,
  };

  console.log(usuario);

  UsuarioModel.save(usuario, async (err) => {
    if (err) {
      console.log(err);
      let locals = {
        title: `Error al salvar el registro con el id: ${usuario.id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
	  
      const link = `${urlPanel}/login`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: mailConfigSender,
      });

    //   let html = `
	// 		<span>
	// 			<br>
	// 			Hola <strong > <span style="text-transform: capitalize;">${usuario.nombre_usuario}</span></strong> 
	// 			<br/>
	// 			Se ha creado tu cuenta en <strong > plataforma administrativa de ${paramSettingCompany.valor}</strong>
	// 			<br/>
	// 			Para ingresar da clic <a href="${link}">aquí</a>
	// 			<br/>
	// 			Tus credenciales de acceso son
	// 			<br>
	// 			Usuario: <strong>${usuario.usuario}</strong>
	// 			<br />
	// 			OTP: <strong>${otp}</strong>
	// 					<br>
	// 			Recuerda cambiar tu contraseña
	// 					<br>
	// 					<br>
	// 						Módulo desarrollado por el equipo (2)
			
	// 					</span>	
	// 		`;

	let html = `
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
		<head>
		<meta charset="UTF-8">
		<meta content="width=device-width, initial-scale=1" name="viewport">
		<meta name="x-apple-disable-message-reformatting">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="telephone=no" name="format-detection">
		<title>New Template</title><!--[if (mso 16)]>
			<style type="text/css">
			a {text-decoration: none;}
			</style>
			<![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
		<xml>
			<o:OfficeDocumentSettings>
			<o:AllowPNG></o:AllowPNG>
			<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml>
		<![endif]-->
		<style type="text/css">
		#outlook a {
			padding:0;
		}
		.es-button {
			mso-style-priority:100!important;
			text-decoration:none!important;
		}
		a[x-apple-data-detectors] {
			color:inherit!important;
			text-decoration:none!important;
			font-size:inherit!important;
			font-family:inherit!important;
			font-weight:inherit!important;
			line-height:inherit!important;
		}
		.es-desk-hidden {
			display:none;
			float:left;
			overflow:hidden;
			width:0;
			max-height:0;
			line-height:0;
			mso-hide:all;
		}
		[data-ogsb] .es-button {
			border-width:0!important;
			padding:10px 20px 10px 20px!important;
		}
		.es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
			background:#56d66b!important;
			border-color:#56d66b!important;
		}
		.es-button-border:hover {
			border-color:#42d159 #42d159 #42d159 #42d159!important;
			background:#56d66b!important;
		}
		td .es-button-border:hover a.es-button-1 {
			background:#d73c3c!important;
			border-color:#d73c3c!important;
		}
		td .es-button-border-2:hover {
			background:#d73c3c!important;
			border-style:solid solid solid solid!important;
			border-color:#42d159 #42d159 #42d159 #42d159!important;
		}
		@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
		@media print {
			.ms-editor-squiggler {
				display:none !important;
			}
		}
		.ms-editor-squiggler {
			all: initial;
			display: block !important;
			height: 0px !important;
			width: 0px !important;
		}
		@media print {
			.ms-editor-squiggler {
				display:none !important;
			}
		}
		.ms-editor-squiggler {
			all: initial;
			display: block !important;
			height: 0px !important;
			width: 0px !important;
		}
		</style>
		</head>
		<body class="ms-Fabric--isFocusVisible" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
		<div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
					<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
						<v:fill type="tile" color="#f6f6f6"></v:fill>
					</v:background>
				<![endif]-->
		<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
			<tr>
			<td valign="top" style="padding:0;Margin:0">
			<table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
				<tr>
				<td align="center" style="padding:0;Margin:0">
				<table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
					<tr>
					<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
					<table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
						<tr>
						<td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
						<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
							<tr>
							<td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://kmwqza.stripocdn.email/content/guids/CABINET_2ff5ded66c4e2609b5e7e1572066f8bb/images/screen_shot_20221108_at_115216_pm.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="492"></td>
							</tr>
						</table></td>
						</tr>
					</table></td>
					</tr>
				</table></td>
				</tr>
			</table>
			<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
				<tr>
				<td align="center" style="padding:0;Margin:0">
				<table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
					<tr>
					<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
					<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
						<tr>
						<td valign="top" align="center" style="padding:0;Margin:0;width:560px">
						<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
							<tr>
							<td align="center" spellcheck="false" data-ms-editor="true" style="padding:0;Margin:0">
							Hola <strong>${usuario.nombre_usuario}</strong>  se ha creado una nueva cuenta con tu correo
							en  Panel administrativo <strong> ${paramSettingCompany.valor}</strong>
							Tus credenciales de acceso son
								<br>
								Usuario: <strong>${usuario.usuario}</strong>
								<br />
								OTP: <strong>${otp}</strong>
										<br>
								NOTA:Recuerda que debes cambiar tu contraseña
										<br>
								Termina de configurar tu cuenta dando clic
								<editor-squiggler style="height:0px;width:0px">
								<div class="ms-editor-squiggler"></div> 
							</editor-squiggler></td>
							</tr>
						</table></td>
						</tr>
					</table></td>
					</tr>
				</table></td>
				</tr>
			</table>
			<table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
				<tr>
				<td align="center" style="padding:0;Margin:0">
				<table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
					<tr>
					<td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
					<table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
						<tr>
						<td align="left" style="padding:0;Margin:0;width:560px">
						<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
							<tr>
							<td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="" target="_blank" hidden>
			<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
						style="height:41px; v-text-anchor:middle; width:87px" arcsize="50%" stroke="f"  fillcolor="#e06666">
				<w:anchorlock></w:anchorlock>
				<center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>AQUÍ</center>
			</v:roundrect></a>
		<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border-2 es-button-border" style="border-style:solid;border-color:#2cb543;background:#e06666;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="${link}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#e06666;border-width:10px 20px 10px 20px;display:inline-block;background:#e06666;border-radius:30px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">AQUÍ</a></span><!--<![endif]--></td>
							</tr>
						</table></td>
						</tr>
					</table></td>
					</tr>
				</table></td>
				</tr>
			</table>
			<table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
				<tr>
				<td align="center" style="padding:0;Margin:0">
				<table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
					<tr>
					<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
					<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
						<tr>
						<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
						<editor-squiggler style="height:0px;width:0px">
							<div class="ms-editor-squiggler"></div> 
						</editor-squiggler>
						<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
							<tr>
							<td align="center" spellcheck="false" data-ms-editor="true" bgcolor="#ea9999" style="padding:15px;Margin:0">Para dudas o consultas comunícate con&nbsp;${paramSettingUser.valor}<br>administrador del sistema al número&nbsp;${paramSettingPhone.valor}<br>o escribe al correo&nbsp;${paramSettingCorreo.valor}<br>@2022<br></td>
							</tr>
						</table></td>
						</tr>
					</table></td>
					</tr>
				</table></td>
				</tr>
			</table></td>
			</tr>
		</table>
		</div><editor-card style="position:absolute;top:0px;left:0px;z-index:auto;display:block !important">
		<div dir="ltr" style="all:initial">
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			</div>
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			</div>
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			</div>
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			<div style="all:initial"></div>
			</div>
		</div>
		<div dir="ltr" style="all:initial">
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			</div>
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			</div>
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			</div>
			<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
			<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
			<div style="all:initial"></div>
			</div>
		</div> 
		</editor-card>
		</body>
		</html>
	`;

      const mailOptions = {
        from: mailConfigSender.mail,
        to: usuario.correo_electronico,
        subject: "Bienvenido(a) a " + paramSettingCompany.valor,
        html: html,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          response = res.status(400).send({
            status: true,
            code: 400,
            message: "ha ocurrido un error el enviar el correo",
            object: error,
          });
        } else {
          // console.log("Email sent: " + info.response);
          response = res.status(200).send({
            status: true,
            code: 200,
            message: "Se ha enviado link a tu correo",
            object: usuario,
          });
        }
      });
    }
  });
};

UsuarioController.autoregistro = (req, res, next) => {
  const { paramSettings } = req;
  const paramSettingCorreo = filterParamUtil(paramSettings, "ADMIN_CORREO");
  const paramSettingPass = filterParamUtil(paramSettings, "ADMIN_CPASS");
  const paramSettingCompany = filterParamUtil(paramSettings, "SYS_NOMBRE");
  const paramSettingPhone = filterParamUtil(paramSettings, "SYS_PHONE");
  const paramSettingUser = filterParamUtil(paramSettings, "ADMIN_CUSER");
  const paramVigenciaUser = filterParamUtil(paramSettings, "ADMIN_VIGENCIA");

  const paramUrlPanel = filterParamUtil(paramSettings, "URL_PANEL");
  var urlPanel = paramUrlPanel.valor;	

  const mailConfigSender = {
    user: paramSettingCorreo.valor,
    pass: paramSettingPass.valor,
  };

  let usuario = {
    usuario: req.body.usuario,
    nombre_usuario: req.body.nombre_usuario,
    correo_electronico: req.body.correo_electronico,
    contrasena: req.body.contrasena,
    otp: req.body.otp,
	paramVigencia: paramVigenciaUser.valor,
  };

  console.log(usuario);

  UsuarioModel.autoregistro(usuario, async (err, row) => {
    if (err) {
      let locals = {
        title: `Error al salvar el registro con el id: ${usuario.id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.render("error", locals);
    } else {
		// console.log('row==>>>',row.rows)
		// await UsuarioModel.saveHistoricPassword(row.rows[0].id_usuario,req.body.contrasena)
      const link = `${urlPanel}/login`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: mailConfigSender,
      });

      // let html = `
      // <span>
      // 	<br>
      // 	Hola <strong > <span style="text-transform: capitalize;">${usuario.nombre_usuario}</span></strong>
      // 	<br/>
      // 	Se ha creado tu cuenta en <strong > plataforma administrativa de ${paramSettingCompany.valor}</strong>
      // 	<br/>
      // 	Para ingresar da clic <a href="${link}">aquí</a>
      // 	<br/>
      // 	Tus credenciales de acceso son
      // 	<br>
      // 	Usuario: <strong>${usuario.nombre_usuario}</strong>
      // 	<br />
      // 	OTP: <strong>${usuario.otp}</strong>
      // 			<br>
      // 	Recuerda cambiar tu contraseña
      // 			<br>
      // 			<br>
      // 				Módulo desarrollado por el equipo (2)

      // 			</span>
      // `;

      let html = `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
				<head>
				<meta charset="UTF-8">
				<meta content="width=device-width, initial-scale=1" name="viewport">
				<meta name="x-apple-disable-message-reformatting">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta content="telephone=no" name="format-detection">
				<title>New Template</title><!--[if (mso 16)]>
					<style type="text/css">
					a {text-decoration: none;}
					</style>
					<![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
				<xml>
					<o:OfficeDocumentSettings>
					<o:AllowPNG></o:AllowPNG>
					<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
				<![endif]-->
				<style type="text/css">
				#outlook a {
					padding:0;
				}
				.es-button {
					mso-style-priority:100!important;
					text-decoration:none!important;
				}
				a[x-apple-data-detectors] {
					color:inherit!important;
					text-decoration:none!important;
					font-size:inherit!important;
					font-family:inherit!important;
					font-weight:inherit!important;
					line-height:inherit!important;
				}
				.es-desk-hidden {
					display:none;
					float:left;
					overflow:hidden;
					width:0;
					max-height:0;
					line-height:0;
					mso-hide:all;
				}
				[data-ogsb] .es-button {
					border-width:0!important;
					padding:10px 20px 10px 20px!important;
				}
				.es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
					background:#56d66b!important;
					border-color:#56d66b!important;
				}
				.es-button-border:hover {
					border-color:#42d159 #42d159 #42d159 #42d159!important;
					background:#56d66b!important;
				}
				td .es-button-border:hover a.es-button-1 {
					background:#d73c3c!important;
					border-color:#d73c3c!important;
				}
				td .es-button-border-2:hover {
					background:#d73c3c!important;
					border-style:solid solid solid solid!important;
					border-color:#42d159 #42d159 #42d159 #42d159!important;
				}
				@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
				@media print {
					.ms-editor-squiggler {
						display:none !important;
					}
				}
				.ms-editor-squiggler {
					all: initial;
					display: block !important;
					height: 0px !important;
					width: 0px !important;
				}
				@media print {
					.ms-editor-squiggler {
						display:none !important;
					}
				}
				.ms-editor-squiggler {
					all: initial;
					display: block !important;
					height: 0px !important;
					width: 0px !important;
				}
				</style>
				</head>
				<body class="ms-Fabric--isFocusVisible" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
				<div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" color="#f6f6f6"></v:fill>
							</v:background>
						<![endif]-->
				<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
					<tr>
					<td valign="top" style="padding:0;Margin:0">
					<table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
						<tr>
						<td align="center" style="padding:0;Margin:0">
						<table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
							<tr>
							<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
							<table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
								<tr>
								<td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
								<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
									<tr>
									<td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://kmwqza.stripocdn.email/content/guids/CABINET_2ff5ded66c4e2609b5e7e1572066f8bb/images/screen_shot_20221108_at_115216_pm.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="492"></td>
									</tr>
								</table></td>
								</tr>
							</table></td>
							</tr>
						</table></td>
						</tr>
					</table>
					<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
						<tr>
						<td align="center" style="padding:0;Margin:0">
						<table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
							<tr>
							<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
							<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
								<tr>
								<td valign="top" align="center" style="padding:0;Margin:0;width:560px">
								<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
									<tr>
									<td align="center" spellcheck="false" data-ms-editor="true" style="padding:0;Margin:0">
									Hola <strong>${usuario.nombre_usuario}</strong>  se ha creado una nueva cuenta con tu correo
									en  Panel administrativo <strong> ${paramSettingCompany.valor}</strong>
									Tus credenciales de acceso son
										<br>
										Usuario: <strong>${usuario.usuario}</strong>
										<br />
										OTP: <strong>${usuario.otp}</strong>
												<br>
										NOTA:Recuerda que debes cambiar tu contraseña
												<br>
										Termina de configurar tu cuenta dando clic<editor-squiggler style="height:0px;width:0px">
										<div class="ms-editor-squiggler"></div> 
									</editor-squiggler></td>
									</tr>
								</table></td>
								</tr>
							</table></td>
							</tr>
						</table></td>
						</tr>
					</table>
					<table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
						<tr>
						<td align="center" style="padding:0;Margin:0">
						<table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
							<tr>
							<td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px">
							<table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
								<tr>
								<td align="left" style="padding:0;Margin:0;width:560px">
								<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
									<tr>
									<td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="" target="_blank" hidden>
					<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
								style="height:41px; v-text-anchor:middle; width:87px" arcsize="50%" stroke="f"  fillcolor="#e06666">
						<w:anchorlock></w:anchorlock>
						<center style='color:#ffffff; font-family:arial, "helvetica neue", helvetica, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>AQUÍ</center>
					</v:roundrect></a>
				<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border-2 es-button-border" style="border-style:solid;border-color:#2cb543;background:#e06666;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="${link}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#e06666;border-width:10px 20px 10px 20px;display:inline-block;background:#e06666;border-radius:30px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">AQUÍ</a></span><!--<![endif]--></td>
									</tr>
								</table></td>
								</tr>
							</table></td>
							</tr>
						</table></td>
						</tr>
					</table>
					<table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
						<tr>
						<td align="center" style="padding:0;Margin:0">
						<table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
							<tr>
							<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
							<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
								<tr>
								<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
								<editor-squiggler style="height:0px;width:0px">
									<div class="ms-editor-squiggler"></div> 
								</editor-squiggler>
								<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
									<tr>
									<td align="center" spellcheck="false" data-ms-editor="true" bgcolor="#ea9999" style="padding:15px;Margin:0">Para dudas o consultas comunícate con&nbsp;${paramSettingUser.valor}<br>administrador del sistema al número&nbsp;${paramSettingPhone.valor}<br>o escribe al correo&nbsp;${paramSettingCorreo.valor}<br>@2022<br></td>
									</tr>
								</table></td>
								</tr>
							</table></td>
							</tr>
						</table></td>
						</tr>
					</table></td>
					</tr>
				</table>
				</div><editor-card style="position:absolute;top:0px;left:0px;z-index:auto;display:block !important">
				<div dir="ltr" style="all:initial">
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					</div>
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					</div>
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					</div>
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					<div style="all:initial"></div>
					</div>
				</div>
				<div dir="ltr" style="all:initial">
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					</div>
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					</div>
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					</div>
					<div style="color:initial;font:initial;font-feature-settings:initial;font-kerning:initial;font-optical-sizing:initial;font-palette:initial;font-synthesis:initial;font-variation-settings:initial;forced-color-adjust:initial;text-orientation:initial;text-rendering:initial;-webkit-font-smoothing:initial;-webkit-locale:initial;-webkit-text-orientation:initial;-webkit-writing-mode:initial;writing-mode:initial;zoom:initial;accent-color:initial;place-content:initial;place-items:initial;place-self:initial;alignment-baseline:initial;animation:initial;app-region:initial;appearance:initial;aspect-ratio:initial;backdrop-filter:initial;backface-visibility:initial;background:initial;background-blend-mode:initial;baseline-shift:initial;block-size:initial;border-block:initial;border:initial;border-radius:initial;border-collapse:initial;border-end-end-radius:initial;border-end-start-radius:initial;border-inline:initial;border-start-end-radius:initial;border-start-start-radius:initial;inset:initial;box-shadow:initial;box-sizing:initial;break-after:initial;break-before:initial;break-inside:initial;buffered-rendering:initial;caption-side:initial;caret-color:initial;clear:initial;clip:initial;clip-path:initial;clip-rule:initial;color-interpolation:initial;color-interpolation-filters:initial;color-rendering:initial;color-scheme:initial;columns:initial;column-fill:initial;gap:initial;column-rule:initial;column-span:initial;contain:initial;contain-intrinsic-block-size:initial;contain-intrinsic-size:initial;contain-intrinsic-inline-size:initial;container:initial;content:initial;content-visibility:initial;counter-increment:initial;counter-reset:initial;counter-set:initial;cursor:initial;cx:initial;cy:initial;d:initial;display:initial;dominant-baseline:initial;empty-cells:initial;fill:initial;fill-opacity:initial;fill-rule:initial;filter:initial;flex:initial;flex-flow:initial;float:initial;flood-color:initial;flood-opacity:initial;grid:initial;grid-area:initial;height:initial;hyphenate-character:initial;hyphens:initial;image-orientation:initial;image-rendering:initial;inline-size:initial;inset-block:initial;inset-inline:initial;isolation:initial;letter-spacing:initial;lighting-color:initial;line-break:initial;list-style:initial;margin-block:initial;margin:initial;margin-inline:initial;marker:initial;mask:initial;mask-type:initial;max-block-size:initial;max-height:initial;max-inline-size:initial;max-width:initial;min-block-size:initial;min-height:initial;min-inline-size:initial;min-width:initial;mix-blend-mode:initial;object-fit:initial;object-position:initial;object-view-box:initial;offset:initial;opacity:initial;order:initial;origin-trial-test-property:initial;orphans:initial;outline:initial;outline-offset:initial;overflow-anchor:initial;overflow-clip-margin:initial;overflow-wrap:initial;overflow:initial;overscroll-behavior-block:initial;overscroll-behavior-inline:initial;overscroll-behavior:initial;padding-block:initial;padding:initial;padding-inline:initial;page:initial;page-orientation:initial;paint-order:initial;perspective:initial;perspective-origin:initial;pointer-events:initial;position:absolute;quotes:initial;r:initial;resize:initial;rotate:initial;ruby-position:initial;rx:initial;ry:initial;scale:initial;scroll-behavior:initial;scroll-margin-block:initial;scroll-margin:initial;scroll-margin-inline:initial;scroll-padding-block:initial;scroll-padding:initial;scroll-padding-inline:initial;scroll-snap-align:initial;scroll-snap-stop:initial;scroll-snap-type:initial;scrollbar-gutter:initial;shape-image-threshold:initial;shape-margin:initial;shape-outside:initial;shape-rendering:initial;size:initial;speak:initial;stop-color:initial;stop-opacity:initial;stroke:initial;stroke-dasharray:initial;stroke-dashoffset:initial;stroke-linecap:initial;stroke-linejoin:initial;stroke-miterlimit:initial;stroke-opacity:initial;stroke-width:initial;tab-size:initial;table-layout:initial;text-align:initial;text-align-last:initial;text-anchor:initial;text-combine-upright:initial;text-decoration:initial;text-decoration-skip-ink:initial;text-emphasis:initial;text-emphasis-position:initial;text-indent:initial;text-overflow:initial;text-shadow:initial;text-size-adjust:initial;text-transform:initial;text-underline-offset:initial;text-underline-position:initial;touch-action:initial;transform:initial;transform-box:initial;transform-origin:initial;transform-style:initial;transition:initial;translate:initial;user-select:initial;vector-effect:initial;vertical-align:initial;visibility:initial;border-spacing:initial;-webkit-box-align:initial;-webkit-box-decoration-break:initial;-webkit-box-direction:initial;-webkit-box-flex:initial;-webkit-box-ordinal-group:initial;-webkit-box-orient:initial;-webkit-box-pack:initial;-webkit-box-reflect:initial;-webkit-highlight:initial;-webkit-line-break:initial;-webkit-line-clamp:initial;-webkit-mask-box-image:initial;-webkit-mask:initial;-webkit-mask-composite:initial;-webkit-print-color-adjust:initial;-webkit-rtl-ordering:initial;-webkit-ruby-position:initial;-webkit-tap-highlight-color:initial;-webkit-text-combine:initial;-webkit-text-decorations-in-effect:initial;-webkit-text-fill-color:initial;-webkit-text-security:initial;-webkit-text-stroke:initial;-webkit-user-drag:initial;-webkit-user-modify:initial;white-space:initial;widows:initial;width:initial;will-change:initial;word-break:initial;word-spacing:initial;x:initial;y:initial;z-index:2147483647">
					<link rel="stylesheet" href="chrome-extension://gpaiobkfhnonedkhhfjpmhdalgeoebfa/fonts/fabric-icons.css">
					<div style="all:initial"></div>
					</div>
				</div> 
				</editor-card>
				</body>
				</html>
			`;

      const mailOptions = {
        from: mailConfigSender.mail,
        to: usuario.correo_electronico,
        subject: "Bienvenido(a) a " + paramSettingCompany.valor,
        html: html,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          response = res.status(400).send({
            status: true,
            code: 400,
            message: "ha ocurrido un error el enviar el correo",
            object: error,
          });
        } else {
          // console.log("Email sent: " + info.response);
          response = res.status(200).send({
            status: true,
            code: 200,
            message: "Se ha enviado link a tu correo",
            object: usuario,
          });
        }
      });
      // return response
    }
  });
};

UsuarioController.delete = (req, res, next) => {
  let id_usuario = req.params.id_usuario;
  console.log(id_usuario);

  UsuarioModel.delete(id_usuario, (err, row) => {
    console.log(err, "---", row);
    if (err) {
      let locals = {
        title: `Error al eliminar el registro con el id: ${id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };

      res.status(400).send({
        status: false,
        code: 400,
        message: "Ha ocurrido un error al eliminar usuario",
        object: err,
      });
    } else {
      res.status(200).send({
        status: true,
        code: 200,
        message: "Registro eliminado correctamente",
        object: [row.rows],
      });
    }
  });
};

UsuarioController.error404 = (req, res, next) => {
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

module.exports = UsuarioController;
