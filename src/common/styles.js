import WeatherSunny from '../common/images/weather_sunny.gif'
import WeatherCloudy from '../common/images/weather_cloudy.gif'


const BackgroundStyleSunny = {
  width: "100%",
  backgroundRepeat: "no-repeat",
  height: "auto",
  backgroundImage: `url(${WeatherSunny})`
}

const BackgroundStyleCloudy = {
  width: "100%",
  backgroundRepeat: "no-repeat",
  height: "auto",
  backgroundImage: `url(${WeatherCloudy})`
}

export default {
  BackgroundStyleSunny,
  BackgroundStyleCloudy
}
