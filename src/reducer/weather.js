import {
    REQUEST,
    START,
    FAILED,
    RECEIVE,
    WEATHER,
    FORECAST
} from '../constants';

const initialState = {
    isInvalid: false,
    isLoading: false
};

export default (state = initialState, action) => {

    const {type, payload} = action

    switch (type) {
        case REQUEST + START:
            return {
                ...state,
                isInvalid: false,
                isLoading: true
            }
        case RECEIVE + WEATHER:
            return {
                ...state,
                isInvalid: false,
                current: payload,
                isLoading: false
            }

        case REQUEST + FAILED:
            return {
                ...state,
                isInvalid: true,
                error: action.error
            }
        case RECEIVE + FORECAST:
            return {
                ...state,
                isInvalid: false,
                forecast: payload,
                isLoading: false
            }
        default:
            return state;
    }
};


