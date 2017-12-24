import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import {iconWeather, plusDecoration, getDateFormat} from '../../share/share';
import {MULTIPLIER} from '../../constants'

const propTypes = {
    forecast: PropTypes.array.isRequired,
    focusedDay: PropTypes.string.isRequired
}

const ExtendedForecast = ({ forecast, focusedDay }) => {
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
					{forecast.filter((day) => {
						return (getDateFormat(day.dt, MULTIPLIER)).getDate().toString() === focusedDay;
					})
					.map(({dt, weather, main : { temp, humidity, pressure }, wind}) => {
						return <tr key={dt}>
							<td><Timestamp time={dt} format='time' /></td>
							<td><img src={iconWeather(weather[0].icon)} alt="weather"/></td>
							<td>{plusDecoration(temp)}{temp}°</td>
							<td>{wind.speed} mps</td>
							<td>{humidity}%</td>
							<td>{pressure}</td>
						</tr>
					})}
					</tbody>
				</table>
			</div>
		)
}

ExtendedForecast.propTypes = propTypes;

export default ExtendedForecast;