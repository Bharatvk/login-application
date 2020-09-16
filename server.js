
const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());



app.listen(8080, function () {
  console.log('App listening on port 8080!')
})

app.get('/validate', function (req, res) {
  console.log('came here')
  res.send('Hello World')
})

