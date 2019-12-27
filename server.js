const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors');
const fetch = require("node-fetch");
app.use(cors());

app.get('/', function (req, res) {
  res.send("Heloo");
})

app.get('/v1/weatherForecast/:city', async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const city = req.params.city;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=8426def7ae54037a3d1c9d0718b5d5d1`;
  const rawData = await getData(url);

  if (rawData === undefined) {
    res.send("Error with fetching data from API")
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {}

  results.totalPageCount = Math.ceil(rawData.length / limit);

  if (endIndex < rawData.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 1) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }

  results.results = rawData.slice(startIndex, endIndex)

  res.send(results);
});

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.list);
    return json.list;
  }
  catch (error) {
    return error;
  }
};

app.listen(4000)
