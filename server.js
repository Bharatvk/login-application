const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var express = require('express')
var app = express()
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8080, function () {
  console.log('App listening on port 8080!')
})