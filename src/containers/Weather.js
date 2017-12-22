import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import WeatherCurrent from '../components/WeatherCurrent/WeatherCurrent'
import WeatherForecast from '../components/WeatherForecast/WeatherForecast'
import Loading from '../components/Loading/Loading'
import Error from '../components/Error/Error'
import { isLoaded } from '../reducer/loading'


class Weather extends Component {

    static propTypes = {
        weather: PropTypes.object,
        isLoaded: PropTypes.bool
    }

    render() {
        const {isLoaded, weather: {error, current, forecast, isInvalid, isLoading} = {}} = this.props
        if (isLoading) {
            return (
                <h2><Loading /></h2>
            )
        }

        if (isInvalid) {
            console.log('error', {error})
            return (
                <Error error={error} />
            )
        }

       if ((!current || !forecast) && !isLoaded) {
            return null
        }

        return (
            <div className="Weather">
                <WeatherCurrent current={current} />
                <WeatherForecast forecast={forecast.list} />
            </div>
        );
    }
}

export default connect(({loading, weather}) => ({
    isLoaded : isLoaded(loading),
    weather
}))(Weather)

