const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors');
const fetch = require("node-fetch");

app.use(cors());

app.use('/api/v1/', require('./services/api'))

app.use( (err, req, res, next) => {
  res.send(err.message);
})

app.listen(4000)

