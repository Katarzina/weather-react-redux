import { combineReducers } from 'redux'
import weather from './weather'
import { loading } from './loading';

const rootReducer = combineReducers({
	loading,
	weather
});

export default rootReducer;
