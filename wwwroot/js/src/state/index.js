import { combineReducers } from 'redux';

import {
	APP_RECIVED_USERINFO,
	APP_RECIVED_OVERVIEW_GROUPS
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
	return state;
}

const rootReducer = combineReducers({
	userInfo,
	overviewGroups
});

export default rootReducer;
