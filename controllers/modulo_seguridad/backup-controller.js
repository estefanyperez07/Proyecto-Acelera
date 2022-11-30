"use strict";

var databaseBackup = require("../../backups/databaseBackup"),
  BackupController = () => {};

BackupController.save = (req, res, next) => {
  res.status(200).json(databaseBackup());
};

module.exports = BackupController;
