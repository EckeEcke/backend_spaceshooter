const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  database: "sql11700098",
  user: "sql11700098",
  password: "XHDzp2mZny",
  port: 3306
});

const sql = `SELECT * FROM highscores ORDER BY Score DESC`;


con.connect(function(err) {
  if(err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Result: " + result);
  });
});

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  con.query(sql, function(err,result){
    if (err) throw err;
    else {
      res.send(result);
    }})
}).listen(port);


app.post('/post', function(request,response){
  //const postSQL = 'INSERT INTO highscores (Player, Score) VALUES ([request.body.Player],[request.body.Score])';
  console.log(request.body);
  if(request.body.Player == undefined) {
    console.log("no player defined in request body.............")
  }
  if(request.body.Player != undefined && request.body.Score != undefined){
    con.query('INSERT INTO highscores (Player,Score) VALUES (?, ?)',[request.body.Player,request.body.Score], function (err) {
      if(err) throw err;
      else {response.send("Received request")};
  })
  }
})
