import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExtendedForecast from './ExtendedForecast'
import { iconWeather } from '../../share/share'

const dateToString = (date, multiplier = 1) => {
    return new Date(date * multiplier).toDateString()
}

/**
 * Filter forecast data returns one object for the next five days
 * Map over the filtered forecast data and add properties
 * of the object
 */

const formatData = (forecast) => {
	let nextDay = dateToString(forecast[0].dt, 1000);
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return forecast.filter((day, index) => {
        let previousDay = nextDay;
	    let dateString = dateToString(day.dt, 1000);
        nextDay = dateString;
		return dateString.indexOf(previousDay) < 0 || index === 0
	})
	.map((day) => {
	    day.dayName = dayNames[new Date(day.dt * 1000).getDay()]
        day.dayDate = new Date(day.dt * 1000).getDate()
		day.tempMin = temperatureMin(forecast,day.dayDate)
        day.tempMax = temperatureMax(forecast,day.dayDate)
		day.dayMonth = new Date(day.dt * 1000).getMonth() + 1
		return day
	})
}

/**
 * First day of forecast for calculate default data by date list
 */

const firstDay = (forecast) => {
    return new Date(forecast[0].dt * 1000).getDate()
}

/**
* Return focused day from forecast list
*/

const dayMonth = (forecast, index) => {
    let date = new Date(forecast[0].dt * 1000)
    date.setDate(date.getDate() + index)
    return date.getDate()
}

/**
* Filter forecast data by focused day
*/

const formatDay = (forecast, focusedDay) => {
    return forecast.filter((day) => {
        let dateString = new Date(day.dt * 1000).getDate().toString()
        return dateString === focusedDay
    })
}

/**
 * Calculate min temp from focused day
 */

const temperatureMin = (forecast, focusedDay) => {
    const dataFromFocusedDay = formatDay(forecast,focusedDay.toString())
	let minTemperature = []
    dataFromFocusedDay.forEach(function(list) {
    	   minTemperature.push(list.main.temp_min)
	})
    return Math.min.apply(null, minTemperature)
}
/**
* Calculate max temp from focused day
*/
const temperatureMax = (forecast, focusedDay) => {
    const dataFromFocusedDay = formatDay(forecast,focusedDay.toString())
    let maxTemperature = []
    dataFromFocusedDay.forEach(function(list) {
        maxTemperature.push(list.main.temp_max)
    })
    return Math.max.apply(null, maxTemperature)
}


class WeatherForecast extends Component {

	static propTypes = {
        forecast: PropTypes.array.isRequired
    }

    state = {
        focused: 0,
		focusedDay:  firstDay(this.props.forecast)
    }

    clicked = (index) => {

        //The click handler will update the state
        // change the index to a focused menu item

        this.setState({focused: index})
        this.setState({focusedDay: dayMonth( this.props.forecast, index) })
    }

	render() {

        const { forecast } = this.props
        let forecasts = formatData(forecast)
        let self = this
		return (
        <div>
        <ul>
            {forecasts.map(function(day, index) {
                let style = '';
                if(self.state.focused === index) style = 'focused';
                let icon = iconWeather(day.weather[0].icon);
					return <li key={index} className={style} onClick={self.clicked.bind(self, index)}>
                        <div>
						    <div>{day.dayName}</div>
							<div className="month">{day.dayDate}.{day.dayMonth}.</div>
						  	<div>min. <span>{day.tempMin > 0 ? "+" : "" }{day.tempMin}°</span></div>
							<div><img src={icon} alt="weather" /> </div>
							<div>max. <span>{day.tempMax> 0 ? "+" : "" }{day.tempMax}°</span></div>
                        </div>
					    </li> })
					}
	    </ul>
        <ExtendedForecast forecast={forecast} focusedDay={this.state.focusedDay.toString()}/>
		</div>
		)
	}
}

export default WeatherForecast
