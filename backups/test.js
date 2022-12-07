const fs = require("fs").promises;
const oldPath = `${__dirname}`;
const newPath = "/path/to/another/directory/file.js";
console.log("Hola");
try {
  // Top level await is available without a flag since Node.js v14.8
  fs.rename(oldPath, newPath);
  // Handle success (fs.rename resolves with `undefined` on success)
  console.log("File moved successfully");
} catch (error) {
  // Handle the error
  console.error(error);
}
