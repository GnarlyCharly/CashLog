import callApi from '../utils/callApi';
import {
	APP_RECIVED_USERINFO,
	APP_RECIVED_OVERVIEW_GROUPS,
	APP_RECIVED_LOGS,
	APP_SAVE_FILTER
} from '../constants/ActionTypes';
import {
	overviewGroups,
	logsWihtDate
 } from './tempData';

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
	return (dispatch, getState) => {
		const state = getState();
		const {
			fromDate,
			toDate,
			ascending
		} = state.filter;

		if(debug){
			setTimeout(() => {
				dispatch({
					type: APP_RECIVED_OVERVIEW_GROUPS,
					overviewGroups: overviewGroups
				});
			}, 1000);
		}else{
			callApi('get', '/overview/' + fromDate.toLocaleDateString() + '/' + toDate.toLocaleDateString() + '/' + ascending).then(returnValue => {
				dispatch({
					type: APP_RECIVED_OVERVIEW_GROUPS,
					overviewGroups: returnValue
				});
			});
		}
	};
}

export function action_app_getLogsWithDate(){
	return (dispatch, getState) => {
		const state = getState();
		const {
			fromDate,
			toDate,
			ascending
		} = state.filter;

		if(debug){
			setTimeout(() => {
				dispatch({
					type: APP_RECIVED_LOGS,
					logs: logsWihtDate
				});
			}, 1000);
		}else{
			callApi('get', '/logs/' + fromDate.toLocaleDateString() + '/' + toDate.toLocaleDateString() + '/' + ascending).then(returnValue => {
				dispatch({
					type: APP_RECIVED_LOGS,
					logs: returnValue
				});
			});
		}
	};
}

export function action_app_saveFilter(fromDate, toDate, ascending){
	return (dispatch) => {
		console.warn(fromDate, toDate, ascending);
		dispatch({
			type: APP_SAVE_FILTER,
			fromDate, toDate, ascending
		});
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
	monthlyIncome: 19100,
	filter: {
		fromDate: '2016-07-01',
		toDate: '2016-07-31',
		ascending: false
	}
};
