import callApi from '../utils/callApi';
import {
	APP_RECIVED_USERINFO,
	APP_RECIVED_OVERVIEW_GROUPS
} from '../constants/ActionTypes';
import { overviewGroups } from './tempData';

const debug = true;


export function action_app_getUserInfo(){
	return (dispatch) => {

		if(debug){
			dispatch({
				type: APP_RECIVED_USERINFO,
				userInfo: tempUserInfo
			});
		}else{
			callApi('get', '/userInfo').then(returnValue => {
				dispatch({
					type: APP_RECIVED_USERINFO,
					userInfo: returnValue
				});
			});
		}
	};
}

export function action_app_getOverviewGroups(){
	return (dispatch) => {

		if(debug){
			dispatch({
				type: APP_RECIVED_OVERVIEW_GROUPS,
				overviewGroups: overviewGroups
			});
		}else{
			// callApi('get', '/overview').then(returnValue => {
			// 	dispatch({
			// 		type: APP_RECIVED_OVERVIEW_GROUPS,
			// 		overviewGroups: returnValue
			// 	});
			// });
		}
	};
}

export function temp(val){
	return (dispatch) => {

		const tempInfo = {...tempUserInfo, totalCostThisMonth: val};

		dispatch({
			type: APP_RECIVED_USERINFO,
			userInfo: tempInfo
		});


	};
}

const tempUserInfo = {
	userName: 'Calle',
	userID: 2,
	isAdmin: true,
	totalCostThisMonth: 1,
	monthlyIncome: 19100
};
