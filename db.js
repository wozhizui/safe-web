var Sequelize = require('sequelize');
var uuid = require('uuid');

// 打印过程信息
console.log('init sequelize...');

// 定义生成不重复id的函数，使用uuid
function generateId() {
  return uuid.v4();
}

// 实例化sequelize
var sequelize = new Sequelize('test2', 'root', '8307', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// 测试数据库连接
sequelize.authenticate().then(function() {
  console.log("数据库连接成功");
}).catch(function(err) {
  //数据库连接失败时打印输出
  console.error(err);
  throw err;
});

// 定义ID的数据类型
var ID_TYPE  = Sequelize.STRING(50);

// 统一模型形式的函数
function defineModel(name, attributes) {
  var attrs = {}; // 先建立对应的关系
  for (var key in attributes) {
    var value = attributes[key];
    if (typeof value === 'object' && value['type']) { // 针对样子是对象且有type属性的值，默认allowNull为false，不许为空
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }

  // 统一几个属性
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };

  // 显示正在创建的表单名
  console.log('model defined for table: ' + name + '\n');

  // 返回创建的model
  return  sequelize.define(name, attrs, {
    tableName: name, // 自定义表单名
    timestamps: true,
    hooks: {
      beforeCreate: function (obj) {
        console.log('will create entity...' + obj);
        if(!obj.id) {
          obj.id = generateId();
        }
      },
      beforeUpdate: function (obj) {
        console.log('will update entity...' + obj);
      }
    }
  });
}

var exp = {
  defineModel: defineModel,
  Sequelize: Sequelize,
  sequelize: sequelize
}

// 将数据类型绑在导出的db中
var TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN', 'DECIMAL'];
for (var type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;