var LoginModel = require("../../models/modulo_seguridad/login-model");
// var regexMail= '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
var regexText = "^[a-zA-Z 0-9]*$";
const jwt = require("jsonwebtoken");
var validator = require("validator");
const nodemailer = require("nodemailer");
const filterParamUtil = require("../../utils/filterParam.util");

LoginController = () => {};
LoginController.getOne = (req, res, next) => {
  let id_usuario = req.params.id_usuario;
  console.log(id_usuario);

  LoginModel.getOne(id_usuario, (err, rows) => {
    // console.log(err, '---', rows)
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${id_usuario}`,
        description: "Error de Sintaxis SQL",
        error: err,
      };
      res.render("error", locals);
    }
    //    console.log('rows=>',rows.rows)
    var locals = {
      title: "Editar Usuario",
      data: rows,
    };
    res.status(200).json({
      status: true,
      message: "Información encontrada exitosamente",
      object: rows.rows,
    });
    // res.status(200).send(rows.rows)
    //res.render('edit-movie', locals)
  });
};

LoginController.login = async (req, res, next) => {
  let response = null;
  const { paramSettings } = req;
	const paramJwtSecret = filterParamUtil(paramSettings, "JWT_SECRET");
  const  JWT_SECRET = paramJwtSecret.valor;
	// const paramUrlPanel = filterParamUtil(paramSettings, "URL_PANEL");
  // const urlPanel = paramUrlPanel.valor;
	const paramTimeExpired = filterParamUtil(paramSettings, "JWT_TIME_EXPIRED");
  const timeExpired = paramTimeExpired.valor;
	// const paramSettingPass = filterParamUtil(paramSettings, "ADMIN_CPASS");
	// const paramSettingCompany = filterParamUtil(paramSettings, "SYS_NOMBRE");
	// const paramSettingPhone = filterParamUtil(paramSettings, "SYS_PHONE");
	// const paramSettingUser = filterParamUtil(paramSettings, "ADMIN_CUSER");
	
	// const paramUrlPanel = filterParamUtil(paramSettings, "URL_PANEL");
	// var urlPanel = paramUrlPanel.valor;	

  const bodyParams = req.body;
  try {
    if (bodyParams.nombre_usuario && bodyParams.contrasena) {
      const regex_texto = new RegExp(regexText);
      //= =======
      if (!regex_texto.test(bodyParams.nombre_usuario)) {
        return res.status(400).send({
          ok: false,
          code: 400,
          message: "usuario y/o contrasena incorrectos",
          object: {},
        });
      }
      // console.log('asdasd')

      if (!validator.isMD5(bodyParams.contrasena)) {
        return res.status(400).send({
          ok: false,
          code: 400,
          message: "usuario y/o contrasena incorrectos",
          object: {},
        });
      }

      let usuario = {
        nombre_usuario: bodyParams.nombre_usuario,
        contrasena: bodyParams.contrasena,
      };
      console.log(usuario);
      
      LoginModel.login(usuario, (err, row) => {
        if (err) {
          res.status(300).send({
            status: false,
            code: 300,
            message: "usuario y/o contrasena incorrectos",
            object: [],
          });
        }
        // console.log('rows.rows',row.rows)
        let dataUser = row.rows[0].ft_login;
        dataUser = dataUser.split(",");
        let statusUser = dataUser[2];
        // console.log("statusUser", statusUser)
        if (statusUser.toString() !== '"DATOS CORRECTOS"'.toString()) {
          return res.status(400).send({
            status: false,
            code: 400,
            message: statusUser,
            object: [],
          });
        }

        const payload = {
          nameUser: dataUser[1].toUpperCase(),
          id: Number(dataUser[0].replace("(", "") || 0),
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: timeExpired });

        response = res.status(200).send({
          status: true,
          code: 200,
          message: "Login Exitoso",
          "x-token": token,
          data: payload,
        });
      });

      return response;
    }

    let emptyParam = "";

    if (!bodyParams.nombre_usuario) {
      emptyParam = "nombre_usuario";
    }
    if (!bodyParams.contrasena) {
      emptyParam = "contrasena";
    }

    response = res.status(400).send({
      ok: false,
      code: 400,
      message: "No se enviarón algunos parámetros de consulta",
      object: [emptyParam],
    });
    return response;
  } catch (e) {
    return res.status(500).send({
      ok: false,
      code: 500,
      message: "error en el servidor",
      object: e,
    });
  }
};
LoginController.resetPassUser = async (req, res, next) => {
  let response = null;
  const bodyParams = req.body;
  const { paramSettings } = req;
  const paramSettingCorreo = filterParamUtil(paramSettings, "ADMIN_CORREO");
	const paramSettingPass = filterParamUtil(paramSettings, "ADMIN_CPASS");
	const paramSettingCompany = filterParamUtil(paramSettings, "SYS_NOMBRE");
	const paramSettingPhone = filterParamUtil(paramSettings, "SYS_PHONE");
	const paramSettingUser = filterParamUtil(paramSettings, "ADMIN_CUSER");

	const paramJwtSecret = filterParamUtil(paramSettings, "JWT_SECRET");
  const  JWT_SECRET = paramJwtSecret.valor;
	const paramUrlPanel = filterParamUtil(paramSettings, "URL_PANEL");
  const urlPanel = paramUrlPanel.valor;
	const paramTimeExpired = filterParamUtil(paramSettings, "JWT_TIME_EXPIRED");
  const timeExpired = paramTimeExpired.valor;

  const mailConfigSender = {
	  user: paramSettingCorreo.valor,
	  pass: paramSettingPass.valor,
	};
  try {
    if (bodyParams.nombre_usuario) {
      const regex_texto = new RegExp(regexText);
      //= =======
      if (!regex_texto.test(bodyParams.nombre_usuario)) {
        return res.status(400).send({
          ok: false,
          code: 400,
          message: "usuario y/o contrasena incorrectos",
          object: {},
        });
      }

      LoginModel.getByNameUser(bodyParams.nombre_usuario, async (err, row) => {
        if (err) {
          console.log(err);
          return res.status(300).send({
            status: false,
            code: 300,
            message: "ha ocurrido un error al buscar usaurio",
            object: [],
          });
        }

        if (row.rows.length === 0) {
          return res.status(404).send({
            status: false,
            code: 404,
            message: "Usuario no encontrado",
            object: [],
          });
        }
        let dataUsuario = row.rows[0];
        console.log("dataUsuario", dataUsuario);

        //el usuario existe y crear el link
        // const secret = JWT_SECRET + user.password;
        // const secret = JWT_SECRET;
        const payload = {
          correo: dataUsuario.correo_electronico,
          id: dataUsuario.id_usuario,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: timeExpired });
        const link = `${urlPanel}/cambio_contrasena/${dataUsuario.id_usuario}/${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: mailConfigSender,
        });

        // let html = `
        //     <span>
        //     <br>
        //     Hola <strong > <span style="text-transform: capitalize;">${dataUsuario.nombre_usuario}</span></strong> 
        //     <br/>
        //     Se ha creado una solicitud para cambiar tu contraseña en la <strong > plataforma administrativa de BURRI DOGS S.A.</strong>
        //     <br/>
        //     Si has sido tú da clic <a href="${link}">aquí</a>
        //     <br/>
        //     si no has caso omiso de ese correo.
        //     <br>
        //     <br>
        //     <br>
        //         Módulo desarrollado por el equipo (2)

        //     </span>`;


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
                        
                        Hola <strong > <span style="text-transform: capitalize;">${dataUsuario.nombre_usuario}</span></strong> 
                        <br>
                        Se ha creado una solicitud para cambiar tu contraseña en el <strong > Panel administrativo ${paramSettingCompany.valor}</strong>
                        <br>
                        Si has sido tú da clic en el enlace a continuación,sino has caso omiso de este correo.
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
              <![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border-2 es-button-border" style="border-style:solid;border-color:#2cb543;background:#e06666;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="${link}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;border-style:solid;border-color:#e06666;border-width:10px 20px 10px 20px;display:inline-block;background:#e06666;border-radius:30px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">CLIC AQUÍ</a></span><!--<![endif]--></td>
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
          to: dataUsuario.correo_electronico,
          subject: "Restablece tu contraseña",
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
              object: dataUsuario,
            });
          }
        });
      });

      return response;
    }

    let emptyParam = "";

    if (!bodyParams.nombre_usuario) {
      emptyParam = "nombre_usuario";
    }

    response = res.status(400).send({
      ok: false,
      code: 400,
      message: "No se enviarón algunos parámetros de consulta",
      object: [emptyParam],
    });
    return response;
  } catch (e) {
    return res.status(500).send({
      ok: false,
      code: 500,
      message: "error en el servidor",
      object: e,
    });
  }
};

LoginController.validateUser = async (req, res, next) => {
  const { id, token } = req.body;

  const { paramSettings } = req;
  const paramJwtSecret = filterParamUtil(paramSettings, "JWT_SECRET");
  const  JWT_SECRET = paramJwtSecret.valor;

  
  try {
    let userValidation = await LoginModel.getOne(id);
    // console.log("userValidation",userValidation)
    if (!userValidation.rows[0]) {
      return res.status(404).send({
        ok: false,
        code: 404,
        message: "Usuario NO encontrado",
        object: [],
      });
    }
    // validaodn que el tolen no haya sido usado anteriormente
    let tonkenValidation = await LoginModel.searchToken(token);
    console.log('tonkenValidation',tonkenValidation.rows[0])
    if (tonkenValidation.rows[0]) {
      return res.status(403).send({
        ok: false,
        code: 403,
        message: "El enlace que estas visitando ya no esta disponible o no es válido",
        object: [],
      });
    }
    
   await LoginModel.saveToken(token,(err, row) => {
    if (err) {
        console.log('err',err)
    }
    console.log('row',row.rows[0])
  });

    // const payload = await jwt.verify(token, secret);
    await jwt.verify(token, JWT_SECRET, async (err, decoded)=>{
        if (err) {
          return res.status(404).json({
            status: false,
            code: 404,
            message: "Token NO válido",
            object: [],
          });
        }
        // guardando el token en la tabla historica
        // UsuarioModel.save = (data) => {
        //   conn.query(
        //     "SELECT * FROM seguridad.tbl_ms_usuario WHERE id_usuario = $1",
        //     [data.id_usuario],
        //     (err, rows) => {
        //       console.log(`Número de registros: ${rows.rows.length}`);
        //       console.log(`Número de registros: ${err}`);
        
        //     }
        //   );
        // };

        res.status(200).json({
          status: true,
          code: 200,
          message: "Usuario encontrado",
          object: [],
        });
      });
  } catch (error) {
    console.log('error',error)
    return res.status(500).send({
      ok: false,
      code: 500,
      message: "Error en el servidor",
      object: error,
    });
  }
};
LoginController.changePassUser = async (req, res, next) => {
    let response = null;
    const bodyParams = req.body;
  
    try {
      if (
          bodyParams.newPassword && 
          bodyParams.confirmPassword && 
          bodyParams.id_user){
              LoginModel.changuePassById(
                bodyParams.newPassword,
                bodyParams.id_user,
                 (err, row) => {
                if (err) {
                    console.log('err',err)
                  return res.status(300).send({
                    status: false,
                    code: 300,
                    message: "Ha ocurrido un error al ejecutar acción",
                    object: [],
                  });
                }
                response = res.status(200).send({
                  status: true,
                  code: 200,
                  message: "Datos actualizados correctamente",
                  object: row.rows
                });
              });
        return response;
      }
  
      let emptyParam = "";
      if (!bodyParams.confirmPassword) {
        emptyParam = "confirmPassword";
      }
      if (!bodyParams.newPassword) {
        emptyParam = "newPassword";
      }
      if (!bodyParams.id_user) {
        emptyParam = "id_user";
      }
      response = res.status(400).send({
        ok: false,
        code: 400,
        message: "No se enviarón algunos parámetros de consulta",
        object: [emptyParam],
      });
      return response;
    } catch (e) {
      return res.status(500).send({
        ok: false,
        code: 500,
        message: "error en el servidor",
        object: e,
      });
    }
};
module.exports = LoginController;
