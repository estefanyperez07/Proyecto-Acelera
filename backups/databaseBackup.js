"use strict";

// importing required modules
const { execute } = require("@getvim/execute");
const dotenv = require("dotenv").config();
const conf = require("../models/db-conf.json");
const uploadFile = require("../middleware/upload");

const fsp = require("fs").promises;
const fs = require("fs");

const oldPath = `/home/acelera/ApiRESTPostgres/`;
const newPath = `/home/acelera/ApiRESTPostgres/resources/static/assets/uploads/`;

const baseUrl = "http://localhost:3001/files/";

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
  let ruta, mensaje;
  execute(
    `PGPASSWORD="${dbpassword}" pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`
  )
    .then(async () => {
      //res.status(200).json(backupFile);
      try {
        // Top level await is available without a flag since Node.js v14.8
        await fsp.rename(`${oldPath}${backupFile}`, `${newPath}${backupFile}`);
        // Handle success (fs.rename resolves with `undefined` on success)
        console.log("File moved successfully");
      } catch (error) {
        // Handle the error
        console.error(error);
      }
      ruta = `${__dirname}/${backupFile}`;
      mensaje = `Backup Creado exitosamente en: ${__dirname}/${backupFile}`;
      console.log(`Backup Creado exitosamente en: ${__dirname}/${backupFile}`);
      console.log(`Backup created successfully`);
      BackupModel.save(ruta, (err, rows) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(mensaje);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
BackupController.upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 80MB!",
      });
    } else {
      return res.status(500).send({ err });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

BackupController.getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  console.log(directoryPath);

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

BackupController.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

BackupController.remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

BackupController.removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = BackupController;
