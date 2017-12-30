import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import WeatherCurrent from '../components/WeatherCurrent'
import WeatherForecast from './WeatherForecast'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {isLoaded} from '../reducer/loading'


class Weather extends Component {

    static propTypes = {
        weather: PropTypes.object,
        isLoaded: PropTypes.bool,
        current: PropTypes.array,
        forecast: PropTypes.array
    }
    render() {
        const {isLoaded, weather: {error, current, forecast, isInvalid, isLoading} = {}} = this.props
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

        if ((!current || !forecast) && !isLoaded) {
            return null
        }

        return (
            <div className="Weather">
                <WeatherCurrent />
                <WeatherForecast />
            </div>
        );
    }
}

export default connect(({loading, weather}) => ({
    isLoaded : isLoaded(loading),
    weather,
}))(Weather);

