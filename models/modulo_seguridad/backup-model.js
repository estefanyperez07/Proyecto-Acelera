"use strict";

var conn = require("../db-connection"),
  BackupModel = () => {};

BackupModel.save = (ruta, cb) =>
  conn.query("SELECT seguridad.fcn_respaldo_log_insert($1)", [ruta], cb);

module.exports = BackupModel;
