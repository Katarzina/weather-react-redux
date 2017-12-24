import React from 'react';
import {PropTypes} from 'prop-types';
import {iconWeather, plusDecoration} from '../../share/share';

const propTypes = {
    current: PropTypes.object.isRequired
}

const WeatherCurrent = ( {current} ) => {

        const { name, main: { temp, temp_min, temp_max }, sys: {country}, weather } = current

        return (
            <div>
                <h2>{name} - {country}</h2>
                <div>NOW</div>
                <div className="month">{temp}</div>
                <div>min. <span>{plusDecoration(temp_min)}{temp_min}°</span></div>
                <div>max. <span>{plusDecoration(temp_max)}{temp_max}°</span></div>
                <div><img src={iconWeather(weather[0].icon)} alt="weather"/></div>
            </div>
        )
}

WeatherCurrent.propTypes = propTypes;

export default WeatherCurrent;