import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faHistory, faSearch, fas } from '@fortawesome/free-solid-svg-icons'

import ThemeColor from '../../common/colors'

const MainResult = (props) => {
  return (
    <div>
      <p style={{color: ThemeColor}}>
        <FontAwesomeIcon icon={faThermometerHalf} /> <b>{props.city}: {(props.temperature - 0).toFixed(0)} &deg;C</b>
      </p>
      <p>Pressure: {props.pressure} mbar</p>
      <p>Humidity: {props.humidity} %</p>
    </div>
  )
}

export default MainResult