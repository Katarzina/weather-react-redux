import {
    REQUEST, START, FAILED, RECEIVE, WEATHER,
    FORECAST, BASE_URL, APP_ID, UPDATE, FOCUS
} from '../constants';
import {LOADING, LOADING_WEATHER, LOADED} from '../reducer/loading';

export const loading = (payload) => ({type: LOADING, payload})
export const loaded = (payload) => ({type: LOADED, payload})

export const requestStart = () => ({
        type: REQUEST + START
})

export const requestFailed = (error) => ({
        type: REQUEST + FAILED,
        error
})

export const receiveWeather = (payload, type) => ({
        type,
        payload
})

export const updateFocus = (payload) => ({
        type: UPDATE + FOCUS,
        payload
})

export const fetchApi = (params, nameFunction) => {

    const url = `${BASE_URL}/${nameFunction}?${params}&units=metric&appid=${APP_ID}`
    const isWeather = (fnName) => fnName === 'weather'

    return (dispatch) => {

        dispatch(loading(LOADING_WEATHER));
        dispatch(requestStart());
        console.log(url)
        return fetch(url)
                    .then(response => {
                        if (response.status >= 400) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(json => (
                        isWeather(nameFunction)
                            ? dispatch(receiveWeather(json, RECEIVE + WEATHER))
                            : dispatch(receiveWeather(json, RECEIVE + FORECAST))
                        )
                    )
                    .then(_ => dispatch(loaded(LOADING_WEATHER)))
                    .catch(error => {
                        dispatch(requestFailed(error.toString()));
                    });
    };

}

