require('newrelic');
var compression = require('compression');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port =  3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id',express.static(path.join(__dirname, 'public')));

app.get('/reviews/*', (req, res) => {
  let id =  req.originalUrl.split('/')[2];
  axios.get(`http://ec2-18-144-38-130.us-west-1.compute.amazonaws.com:7763/reviews/${id}`)
  .then(({data})=>{res.send(data)})
  .catch(({err})=>{res.status(500).send(err)});
});

app.listen(port);
