import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import WeatherCurrent from '../components/WeatherCurrent'
import ExtendedForecast from '../components/ExtendedForecast';
import WeatherByDay from './WeatherByDay'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {isLoaded} from '../reducer/loading'
import {getDateFormat} from '../share/share';
import {MULTIPLIER} from '../constants';

/**
 * Return focused day from forecast list
 */

const dayOfMonth = (forecast, index) => {
    let date = getDateFormat(forecast[0].dt, MULTIPLIER)
    date.setDate(date.getDate() + index)
    return date.getDate().toString();
}

class Weather extends Component {

    static propTypes = {
        weather: PropTypes.object,
        isLoaded: PropTypes.bool,
        current: PropTypes.array,
        focused: PropTypes.number,
        forecast: PropTypes.object
    }
    render() {
        const { weather: {error, current, forecast, isInvalid, isLoading, focused} = {}} = this.props

        if (isLoading) {
            return (
                <h2><Loading /></h2>
            )
        }

        if (isInvalid) {
            return (
                <Error error={error} />
            )
        }

        if (!current || !forecast) {
            return null
        }

        return (
            <div className="Weather">
                <WeatherCurrent />
                <WeatherByDay />
                <ExtendedForecast forecast={forecast.list} focusedDay={dayOfMonth(forecast.list, focused)}/>
            </div>
        );
    }
}

export default connect(({loading, weather}) => ({
    isLoaded : isLoaded(loading),
    weather,
}))(Weather);

