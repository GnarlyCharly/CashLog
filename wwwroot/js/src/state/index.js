import { combineReducers } from 'redux';

import filter from './filter';
import {
	APP_RECIVED_USERINFO,
	APP_RECIVED_OVERVIEW_GROUPS,
	APP_RECIVED_LOGS,
	APP_SAVE_FILTER
} from '../constants/ActionTypes';

export function userInfo(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return action.userInfo;
	}
	return state;
}

export function overviewGroups(state = null, action){
	if(action.type === APP_RECIVED_OVERVIEW_GROUPS){
		return action.overviewGroups;
	}
	if(action.type === APP_SAVE_FILTER){
		return null;
	}
	return state;
}

export function logs(state = null, action){
	if(action.type === APP_RECIVED_LOGS){
		return action.logs;
	}
	if(action.type === APP_SAVE_FILTER){
		return null;
	}
	return state;
}

const rootReducer = combineReducers({
	userInfo,
	filter,
	overviewGroups,
	logs
});

export default rootReducer;
