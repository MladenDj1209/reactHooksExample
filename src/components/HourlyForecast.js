import React, { useState, useEffect, useReducer } from 'react';
import TemperatureCard from './TemperatureCard'
import { Container, Row, Col, Button } from 'react-bootstrap'
import reducer from '../common/reducer'
import WeatherChart from './Chart';

const useHourlyForecast = (city, page) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(9);
  const [totalPageCount, setTotalPageCount] = useState();

  useEffect(() => {
    async function fetchData() {

      const url = `http://localhost:4000/v1/weatherForecast/${city}?page=${page}&limit=${limit}`
      try {
        setLoading(true);
        debugger
        const response = await fetch(url);
        const json = await response.json();
        setResults(json.results);
        setTotalPageCount(json.totalPageCount)
        setLoading(false)
      }
      catch (error) {
        console.log({ error });
      }
      finally {
        setLoading(false);
      }
    }

    if (city !== '') {
      fetchData();
    }
  }, [city, page]);
  debugger
  return [results, loading, totalPageCount];
}

function HourlyForecast(props) {
  const [page, setPage] = useState(1);
  const [results, loading, totalPageCount] = useHourlyForecast(props.city, page)
  const pageNumbers = [...Array(totalPageCount).keys()];

  return (
    <div>
      {(loading || results === undefined || results.length === 0) ?
        null
        :
        <Container style={{ marginBottom: 25 }}>
          <h4
            style={{ marginBottom: 50 }}
            className="text-info"
          >Temperature for every 3 hours for {props.city}</h4>
          <Row>
            {results.map(item => (
              <Col md={4} style={{ marginBottom: 50 }}>
                <TemperatureCard
                  weather={item.weather[0].main}
                  date={item.dt_txt}
                  temperature={item.main.temp}
                  pressure={item.main.pressure}
                  humidity={item.main.humidity}
                />
              </Col>
            ))
            }

          </Row>
          <Row className="justify-content-md-center">
            {pageNumbers.map((item) => (
              <Button
                onClick={() => setPage(item + 1)}
                key={item + 1}
                style={{ margin: 2 }}
              >{page === item + 1 ? <b>{item + 1}</b> : item + 1}</Button>
            )
            )}
          </Row>
        </Container>
      }
    </div >
  )
}

export default {
  HourlyForecast,
}