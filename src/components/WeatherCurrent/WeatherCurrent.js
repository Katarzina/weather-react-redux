import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {iconWeather} from '../../share/share';

class WeatherCurrent extends Component {

    static propTypes = {
        current: PropTypes.object.isRequired
    }

    render() {
        const { current : {name,
                           main: { temp, temp_min, temp_max },
                           sys: {country},
                           weather
                           } = {}
              } = this.props
        return (
            <div>
                <div>
                    <h2 className="city">{name} - {country}</h2>
                        <div className="current">NOW</div>
                        <div className="month">{temp}</div>
                        <div className="min">мін. <span>{temp_min > 0 ? '+' : '' }{temp_min}°</span></div>
                        <div className="max">макс. <span>{temp_max > 0 ? '+' : '' }{temp_max}°</span></div>
                        <div><img src={iconWeather(weather[0].icon)} alt="weather"/></div>
                </div>
            </div>
        )
    }
}


export default WeatherCurrent;