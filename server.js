const http = require('http');

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

var database = require ('./controllers/database.controller')



app.use('/database', database);

app.listen(6066, function () {
  console.log('App listening on port 8080!')
})
