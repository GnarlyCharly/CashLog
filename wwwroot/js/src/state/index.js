import { combineReducers } from 'redux';

import filter from './filter';
import {
	APP_RECIVED_USERINFO,
	APP_RECIVED_OVERVIEW_GROUPS,
	APP_RECIVED_LOGS,
	APP_RECIVED_COMMENTS,
	APP_SAVE_FILTER
} from '../constants/ActionTypes';

export function userInfo(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return {
			userName: action.userInfo.userName,
			userID: action.userInfo.userID,
			isAdmin: action.userInfo.isAdmin,
			totalCostThisMonth: action.userInfo.totalCostThisMonth,
			monthlyIncome: action.userInfo.monthlyIncome
		};
	}
	return state;
}

export function tagGroups(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return action.userInfo.tagGroups;
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

export function comments(state = null, action){
	if(action.type === APP_RECIVED_COMMENTS){
		return action.comments;
	}
	return state;
}

const rootReducer = combineReducers({
	userInfo,
	tagGroups,
	filter,
	overviewGroups,
	logs,
	comments
});

export default rootReducer;
