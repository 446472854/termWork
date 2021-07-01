const mysql = require('mysql')
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "book"
})
con.connect()
function MyQuery (str, data = []) {
  return new Promise((resolve, reject) => {
    con.query(str, data, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = MyQuery