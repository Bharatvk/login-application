const http = require('http');

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const connection = require('./controllers/connection.controller.js');
app.use(cors());

var database = require ('./controllers/database.controller')



app.use('/api/connection', connection);
app.use('/validate',  (req, res) => {
  console.log('came here')
  res.send({status:"success"})
});

app.listen(6066, function () {
  console.log('App listening on port 6066!')
})
