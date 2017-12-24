export const iconWeather = (iconWeather) => {
    return 'http://openweathermap.org/img/w/' + iconWeather + '.png'
}

export const plusDecoration = (value) => {
    return value > 0 ? '+' : ''
}

export const dateToString = (date, multiplier = 1) => {
    return new Date(date * multiplier).toDateString();
}

export const getDateFormat = (date, multiplier = 1) => {
    return new Date(date * multiplier);
}