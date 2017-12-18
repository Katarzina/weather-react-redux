import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { iconWeather } from '../../share/share'

/**
* Filter forecast data by focused day
*/

const formatDay = (forecast, focusedDay) => {
    return forecast.filter((day) => {
        let dateString = new Date(day.dt * 1000).getDate().toString()
        return dateString === focusedDay
    })
}

class ExtendedForecast extends Component {

	static propTypes = {
        forecast: PropTypes.array.isRequired,
        focusedDay: PropTypes.string.isRequired
    }

	render() {
		const { forecast, focusedDay } = this.props
		let focusedData = formatDay(forecast,focusedDay)
		return (
			<div>
				<div className="focusedDay">Forecast - {focusedDay}</div>
				<table className="forecast-table">
					<thead>
						<tr>
							<th>Time</th>
							<th>Weather</th>
							<th>Temperature </th>
							<th>Wind (m/s)</th>
							<th>Humidity %</th>
							<th>Pressure hPa</th>
						</tr>
					</thead>
					<tbody>
            {focusedData.map((list, index) => {
              	let icon = iconWeather(list.weather[0].icon);
              	return <tr key={index}>
						<td><Timestamp time={list.dt} key={list.dt} format='time' /></td>
						<td><img src={icon} alt="weather"/></td>
						<td>{list.main.temp > 0 ? "+" : "" }{list.main.temp}°</td>
						<td>{list.wind.speed} mps</td>
						<td>{list.main.humidity}%</td>
						<td>{list.main.pressure}</td>
 						</tr>
                    }).filter((date) => {
                        return date
						})
				}
					</tbody>
				</table>
		    </div>

		)
	}
}

export default ExtendedForecast