"use strict";
// importing required modules
const { execute } = require("@getvim/execute");
const dotenv = require("dotenv").config();
const conf = require("../models/db-conf.json");

// getting db connection parameters from environment file
const username = conf.user;
const database = conf.database;
const dbHost = conf.host;
const dbPort = conf.port;
const dbpassword = conf.password;

// defining backup file name
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const backupFile = `pg-backup-${today}.tar`;
var BackupModel = require("../models/modulo_seguridad/backup-model");
var BackupController = () => {};

// writing postgresql backup function
BackupController.takePGBackup = (req, res, next) => {
  let ruta;
  execute(
    `PGPASSWORD="${dbpassword}" pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`
  )
    .then(async () => {
      //res.status(200).json(backupFile);
      ruta = `Backup Creado exitosamente en: ${__dirname}/${backupFile}`;
      console.log(`Backup Creado exitosamente en: ${__dirname}/${backupFile}`);
      console.log(`Backup created successfully`);
      BackupModel.save(ruta, (err, rows) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(ruta);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = BackupController;
