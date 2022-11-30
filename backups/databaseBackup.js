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

var BackupController = () => {};

// writing postgresql backup function
BackupController.takePGBackup = (req, res, next) => {
  execute(
    `PGPASSWORD="${dbpassword}" pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`
  )
    .then(async () => {
      res.status(200).json(backupFile);
      console.log(`Backup created successfully`);
    })
    .catch((err) => {
      console.log(err);
    });
  return "BackupCreado";
};

module.exports = BackupController;
