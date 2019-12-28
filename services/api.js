const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors');
const fetch = require("node-fetch");
app.use(cors());
const router = express.Router()

const WeatherService = require('./weatherService')

router.get('/', function (req, res, next) {
  res.send("Heloo");
})

router.get('/weatherForecast/:city', async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const city = req.params.city;

  const response = await WeatherService(city, page, limit)

  res.send(response)
});

module.exports = router
