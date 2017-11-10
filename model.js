var fs = require('fs');
var db = require('./db');

var files = fs.readdirSync(__dirname + '/models');

var js_files = files.filter((f)=>{
  return f.endsWith('.js');
}, files);

module.exports = {
  Sequelize: db.Sequelize,
  sequelize: db.sequelize
};

for (var f of js_files) {
  console.log(`import model from file ${f}...`);
  var name = f.substring(0, f.length - 3);
  module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.Department.belongsTo(module.exports.Company);
module.exports.Company.hasMany(module.exports.Department);

module.exports.Area.belongsTo(module.exports.Department);
module.exports.Department.hasMany(module.exports.Area);

db.sequelize.sync();