import { combineReducers } from 'redux';

import {
	APP_RECIVED_USERINFO
} from '../constants/ActionTypes';

export function userInfo(state = null, action){
	if(action.type === APP_RECIVED_USERINFO){
		return action.userInfo;
	}
	return state;
}

const rootReducer = combineReducers({

	userInfo
});

export default rootReducer;
