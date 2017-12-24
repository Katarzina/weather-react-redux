import {
    REQUEST,
    START,
    FAILED,
    RECEIVE,
    WEATHER,
    FORECAST,
    UPDATE,
    FOCUS
} from '../constants';
import {createSelector} from 'reselect'

const initialState = {
    isInvalid: false,
    isLoading: false,
    focused: 0
};

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case REQUEST + START:
            return {
                ...state,
                isInvalid: false,
                isLoading: true
            };
        case RECEIVE + WEATHER:
            return {
                ...state,
                isInvalid: false,
                current: payload,
                isLoading: false
            };
        case REQUEST + FAILED:
            return {
                ...state,
                isInvalid: true,
                isLoading: false,
                error: payload
            };
        case RECEIVE + FORECAST:
            return {
                ...state,
                isInvalid: false,
                forecast: payload,
                isLoading: false
            };
        case UPDATE + FOCUS:
            return {
                ...state,
                focused: payload
            };
        default:
            return state;
    }
};

export const stateSelector = (state) => state['weather'];
export const forecastSelector = createSelector(stateSelector, (banks) => banks['forecast']);


