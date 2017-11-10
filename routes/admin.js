// 管理员界面，在实现前端显示后在后端设计接口
var express = require('express');
var router = express.Router();
var model = require('../model');
var Company = model.Company;
var Department = model.Department;
var Area = model.Area;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('首页查询公司信息...')
  Company.findOne()
  .then(function (company) {
    if(company === null) {
      res.render('admin', {title: '项目初始化', company: null, departments: null, area: null});
    } else {
      company.getDepartments()
      .then(function (departments) {
        Area.findAll()
        .then(function (areas) {
          res.render('admin', { title: '管理员', company: company, departments: departments, areas: areas });
        });
      });
    };
  })
  .catch(function (err) {
    console.log(err);
  })
});

module.exports = router;
