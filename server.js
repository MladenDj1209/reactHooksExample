const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors');
const fetch = require("node-fetch");
app.use(cors());
const WeatherService = require('./services/weatherService')

app.get('/', function (req, res) {
  res.send("Heloo");
})

app.get('/v1/weatherForecast/:city', async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const city = req.params.city;

  const response = await WeatherService(city, page, limit) 

  if(!response) {
    res.send('what???', 404);
  }

  res.send(response)
});

app.listen(4000)
