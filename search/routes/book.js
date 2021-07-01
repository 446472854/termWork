var express = require('express');
var router = express.Router();
const Myquery = require('../MyQuery-book')
/* GET home page. */
router.all('*', (req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*")
  next()
})
router.get('/', async function (req, res, next) {
  let uname = req.query.name
  let strSql = `select * from booklist where category = '${uname}'`
  let data = await Myquery(strSql)
  res.send(data)
});
module.exports = router;
