var model = require('./model');

require('./models/ref');

model.sequelize.sync({force: true}).then(() => {
  console.log('数据表初始化完成');
  // 退出
  process.exit(0);
});