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

// writing postgresql backup function
module.exports = function takePGBackup() {
  execute(
    `PGPASSWORD="${dbpassword}" pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`
  )
    .then(() => {
      console.log(`Backup created successfully`);
      return "BackupCreado";
    })
    .catch((err) => {
      console.log(err);
    });
};

// calling postgresql backup function
