import {
    REQUEST, START, FAILED, RECEIVE, WEATHER,
    FORECAST, BASE_URL, APP_ID, UPDATE, FOCUS
} from '../constants'
import {LOADING, LOADING_WEATHER, LOADED} from '../reducer/loading';

export const loading = (payload) => ({type: LOADING, payload})
export const loaded = (payload) => ({type: LOADED, payload})

export function requestStart() {
    return {
        type: REQUEST + START,
    }
}

export function requestFailed(error) {
    return {
        type: REQUEST + FAILED,
        error
    }
}

export function receiveWeather(payload, type) {
    return {
        type,
        payload
    };
}

export function updateFocus(payload) {
    console.log(payload)
    return {
        type: UPDATE + FOCUS,
        payload
    };
}

export function fetchApi(params, nameFunction) {
    const url = `${BASE_URL}/${nameFunction}?${params}&units=metric&appid=${APP_ID}`
    const isWeather = (fnName) => fnName === 'weather'

    return function (dispatch) {

        dispatch(loading(LOADING_WEATHER));
        dispatch(requestStart());

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
                    .then(dispatch(loaded(LOADING_WEATHER)))
                    .catch(error => {
                        dispatch(requestFailed(error.toString()));
                    });
    };

}

