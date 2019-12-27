const fetch = require("node-fetch");

const WeatherService = async (city, page, limit) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=8426def7ae54037a3d1c9d0718b5d5d1`;
  const rawData = await getData(url);

  if (rawData === undefined) {
    return ("Error with fetching data from API")
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

  console.log('Raw data', rawData)
  results.results = rawData.slice(startIndex, endIndex)

  return (results)
}


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


module.exports = WeatherService