import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateFocus} from '../AC';
import ExtendedForecast from '../components/ExtendedForecast';
import {iconWeather, plusDecoration, dateToString, getDateFormat} from '../share/share';
import {stateSelector, forecastSelector} from '../reducer/weather';
import {MULTIPLIER} from '../constants';

/**
 * Filter forecast data returns one object for the next five days
 * Map over the filtered forecast data and add properties
 * of the object
 */

const formatData = (forecast) => {
	let nextDay = dateToString(forecast[0].dt, MULTIPLIER);
	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return forecast.filter((day, index) => {
        let previousDay = nextDay;
        let dateString = dateToString(day.dt, MULTIPLIER);
        nextDay = dateString;
		return dateString.indexOf(previousDay) < 0 || index === 0;
	})
	.map((day) => {
        day.dayName = dayNames[getDateFormat(day.dt, MULTIPLIER).getDay()]
        day.dayDate = getDateFormat(day.dt, MULTIPLIER).getDate()
		day.tempMin = temperatureMin(forecast, day.dayDate)
        day.tempMax = temperatureMax(forecast, day.dayDate)
		day.dayMonth = getDateFormat(day.dt, MULTIPLIER).getMonth() + 1
		return day;
	});
}

/**
* Return focused day from forecast list
*/

const dayOfMonth = (forecast, index) => {
    let date = getDateFormat(forecast[0].dt, MULTIPLIER)
    date.setDate(date.getDate() + index)
    return date.getDate().toString();
}

/**
* Filter forecast data by focused day
*/

const formatDay = (forecast, focusedDay) => {
    return forecast.filter(({dt}) => {
        return getDateFormat(dt, MULTIPLIER).getDate().toString() === focusedDay;
    })
}

/**
 * Calculate min temp from focused day
 */

const temperatureMin = (forecast, focusedDay) => {
    const dataFromFocusedDay = formatDay(forecast, focusedDay.toString())
	let minTemperature = []
    dataFromFocusedDay.forEach(({main}) => {
        minTemperature.push(main.temp_min);
	})
    return Math.min.apply(null, minTemperature);
}
/**
* Calculate max temp from focused day
*/
const temperatureMax = (forecast, focusedDay) => {
    const dataFromFocusedDay = formatDay(forecast, focusedDay.toString())
    let maxTemperature = []
    dataFromFocusedDay.forEach(({main}) => {
        maxTemperature.push(main.temp_max);
    })
    return Math.max.apply(null, maxTemperature);
}


class WeatherForecast extends Component {

	static propTypes = {
        forecast: PropTypes.object,
        weather: PropTypes.object,
        updateFocus: PropTypes.func
    }

    clicked = (index) => {
        //The click handler will update the state
        // change the index to a focused menu item
        this.props.updateFocus(index)
        return false
    }

	render() {

        const { weather : { forecast, focused } = {} } = this.props
        if (!forecast) { return null }
        const forecasts = formatData(forecast.list)
        let self = this
		return (
        <div>
        <ul>
        {forecasts.map(({dayName, dayDate, dayMonth, tempMin, tempMax, weather}, index) => {
            let style = '';
            if( focused === index) style = 'focused';
            return <li key={index} className={style} onClick={self.clicked.bind(self,index)}>
                <div>{dayName}</div>
				<div className="month">{dayDate}.{dayMonth}.</div>
                <div>min. <span>{plusDecoration(tempMin)}{tempMin}°</span></div>
				<div><img src={iconWeather(weather[0].icon)} alt="weather" /> </div>
				<div>max. <span>{plusDecoration(tempMax)}{tempMax}°</span></div>
                </li>
            })
        }
        </ul>
        <ExtendedForecast forecast={forecast.list} focusedDay={dayOfMonth(forecast.list, focused)}/>
        </div>
		);
	}
}

export default connect(
    (state) => ({
        weather: stateSelector(state),
        forecast : forecastSelector(state)
    })
    , {updateFocus})(WeatherForecast);
