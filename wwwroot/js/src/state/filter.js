import { combineReducers } from 'redux';

import {
	APP_RECIVED_USERINFO,
	APP_SAVE_FILTER
} from '../constants/ActionTypes';

export function fromDate(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return new Date(action.userInfo.filter.fromDate);
	}
	if(action.type === APP_SAVE_FILTER){
		return action.fromDate;
	}
	return state;
}

export function toDate(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return new Date(action.userInfo.filter.toDate);
	}
	if(action.type === APP_SAVE_FILTER){
		return action.toDate;
	}
	return state;
}

export function ascending(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return action.userInfo.filter.ascending;
	}
	if(action.type === APP_SAVE_FILTER){
		return action.ascending;
	}
	return state;
}

export default combineReducers({
	fromDate,
	toDate,
	ascending
});
