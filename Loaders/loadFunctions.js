const fs = require("fs");
const path = require("path");

const functionsDir = path.join(__basedir, "Functions");

const modules = {};

function getModules(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      getModules(filePath);
    } else if (stats.isFile() && path.extname(file) === ".js") {
      const module = require(filePath);
      const moduleName = path.basename(file, ".js");
      modules[moduleName] = module;
    }
  });
}

getModules(functionsDir);

module.exports = modules;