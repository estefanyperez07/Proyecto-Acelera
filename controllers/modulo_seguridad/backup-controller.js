"use strict";

var databaseBackup = require("../../backups/databaseBackup"),
  BackupController = () => {};

BackupController.save = (req, res, next) => {
  res.satatus(200).json(databaseBackup());
};
