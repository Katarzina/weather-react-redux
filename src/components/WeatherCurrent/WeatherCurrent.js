import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { iconWeather } from '../../share/share'

class WeatherCurrent extends Component {

    static propTypes = {
        current: PropTypes.object.isRequired
    }

    render() {
        const { current } = this.props
        return (
            <div>
                <div>
                    <h2 className="city">{current.name} - {current.sys.country}</h2>
                        <div className="current">NOW</div>
                        <div className="month">{current.main.temp}</div>
                        <div className="min">мін. <span>{current.main.temp_min > 0 ? "+" : "" }{current.main.temp_min}°</span></div>
                        <div className="max">макс. <span>{current.main.temp_max > 0 ? "+" : "" }{current.main.temp_max}°</span></div>
                        <div><img src={iconWeather(current.weather[0].icon)} alt="weather"/></div>
                </div>
            </div>
        )
    }
}


export default WeatherCurrent