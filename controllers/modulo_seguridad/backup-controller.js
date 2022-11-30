"use strict";

var databaseBackup = require("../../backups/databaseBackup"),
  BackupController = () => {};

BackupController.save = (req, res, next) => {
  let respuesta = databaseBackup();
  res.status(200).json(respuesta);
};

module.exports = BackupController;
