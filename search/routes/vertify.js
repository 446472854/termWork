var express = require('express');
var router = express.Router();
var Myquery = require('../MyQuery')
router.all('*', (req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*")
  next()
})
router.use('/', async (req, res, next) => {
  let info = { ...req.query }
  let strSql = 'insert into feedback values(?,?,?,?,?,?)'
  switch (info.backCate) {
    case 1: info.backCate = '功能建议'; break;
    case 2: info.backCate = '内容建议'; break;
    case 3: info.backCate = 'BUG反馈'; break;
    case 4: info.backCate = '界面建议'; break;
    case 5: info.backCate = '交互建议'; break;
    case 6: info.backCate = '其他'; break;
  }
  let a = await Myquery(strSql, [info.name, info.tel, info.backCate, info.feedContent, info.time, info.score])
  console.log(info.score);
  if (a) {
    res.send('true')
  } else {
    res.send('false')
  }
  next()
})

module.exports = router