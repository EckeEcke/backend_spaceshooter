const express = require('express');
const app = express();
const http = require('http');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "ulsq0qqx999wqz84.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  database: "qzl4o8akbn6y17dv",
  user: "mpwyg8k3gepwa8ib",
  password: "cgyqdt5o7p6l3q6w",
  port: 3306
});

let sql = `SELECT * FROM highscores ORDER BY Score DESC`;
const port = process.env.PORT || 80;

con.connect(function(err) {
  if(err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Result: " + result);
  });
});

app.get('/', function (req, res) {
  con.query(sql, function(err,result){
    if (err) throw err;
    else {
      res.send(result);
    }})
}).listen(port);