import callApi from '../utils/callApi';
import {
	APP_RECIVED_USERINFO,
	APP_RECIVED_OVERVIEW_GROUPS,
	APP_RECIVED_LOGS,
	APP_RECIVED_COMMENTS,
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

export function action_app_getCommentsForTag(tagId, searchStr){
	return (dispatch, getState) => {
		if(searchStr === ''){
			dispatch({
				type: APP_RECIVED_COMMENTS,
				comments: []
			});
			return;
		}
		if(debug){
			setTimeout(() => {
				dispatch({
					type: APP_RECIVED_COMMENTS,
					comments: tempComments
				});
			}, 100);
		}else{
			callApi('get', '/comments/' + tagId + '/' + searchStr).then(returnValue => {
				dispatch({
					type: APP_RECIVED_COMMENTS,
					comments: returnValue
				});
			});
		}
	};
}


export function action_app_saveFilter(fromDate, toDate, ascending){
	return (dispatch) => {
		dispatch({
			type: APP_SAVE_FILTER,
			fromDate, toDate, ascending
		});
	};
}

const tempComments = [
	'Apple', 'Apricot', 'Avocado',
	'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
	'Boysenberry', 'Blood Orange',
	'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
	'Coconut', 'Cranberry', 'Clementine',
	'Damson', 'Date', 'Dragonfruit', 'Durian',
	'Elderberry',
	'Feijoa', 'Fig',
	'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
	'Honeydew', 'Huckleberry',
	'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
	'Kiwi fruit', 'Kumquat',
	'Lemon', 'Lime', 'Loquat', 'Lychee',
	'Nectarine',
	'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
	'Olive', 'Orange',
	'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
	'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
	'Quince',
	'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
	'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
	'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
	'Ugli fruit',
	'Watermelon'];

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
	},
	tagGroups: [
		{
			id: 1,
			name: 'Mat & Dryck',
			tags: [
				{
					id: 1,
					name: 'Livsmedel',
					group: 1
				},
				{
					id: 2,
					name: 'Restaurang',
					group: 1
				},
				{
					id: 3,
					name: 'Fika & Snacks',
					group: 1
				},
				{
					id: 4,
					name: 'Alkohol',
					group: 1
				},
				{
					id: 5,
					name: 'Mat & Dryck Övrigt',
					group: 1
				}
			]
		},
		{
			id: 2,
			name: 'Shopping',
			tags: [
				{
					id: 6,
					name: 'Kläder & Accessoarer',
					group: 2
				},
				{
					id: 7,
					name: 'Hemelektronik',
					group: 2
				},
				{
					id: 8,
					name: 'Sport & Fritidsartiklar',
					group: 2
				},
				{
					id: 9,
					name: 'Böcker & Spel',
					group: 2
				},
				{
					id: 10,
					name: 'Pressenter',
					group: 2
				},
				{
					id: 11,
					name: 'Shopping Övrigt',
					group: 2
				}
			]
		},
		{
			id: 3,
			name: 'Boende & Hushåll',
			tags: [
				{
					id: 12,
					name: 'Hyra',
					group: 3
				},
				{
					id: 13,
					name: 'Media, Tele, It',
					group: 3
				},
				{
					id: 14,
					name: 'Drift',
					group: 3
				},
				{
					id: 15,
					name: 'Försäkringar',
					group: 3
				},
				{
					id: 16,
					name: 'Inredning & Möbler',
					group: 3
				},
				{
					id: 17,
					name: 'Renovering och Bygg',
					group: 3
				},
				{
					id: 18,
					name: 'Trädgord & Tomt',
					group: 3
				},
				{
					id: 19,
					name: 'Boende & Hushåll Övrigt',
					group: 3
				}
			]
		},
		{
			id: 4,
			name: 'Transport',
			tags: [
				{
					id: 20,
					name: 'Bil',
					group: 4
				},
				{
					id: 21,
					name: 'Bränsle',
					group: 4
				},
				{
					id: 22,
					name: 'Tåg',
					group: 4
				},
				{
					id: 23,
					name: 'Taxi',
					group: 4
				},
				{
					id: 24,
					name: 'Buss',
					group: 4
				},
				{
					id: 25,
					name: 'Flyg',
					group: 4
				},
				{
					id: 26,
					name: 'Transport Övrigt',
					group: 4
				}
			]
		},
		{
			id: 5,
			name: 'Fritid',
			tags: [
				{
					id: 27,
					name: 'Nöje',
					group: 5
				},
				{
					id: 28,
					name: 'Hobby',
					group: 5
				},
				{
					id: 29,
					name: 'Sport & träning',
					group: 5
				},
				{
					id: 30,
					name: 'Semester',
					group: 5
				},
				{
					id: 31,
					name: 'Fritid Övrigt',
					group: 5
				}
			]
		},
		{
			id: 6,
			name: 'Hälsa & Skönhet',
			tags: [
				{
					id: 32,
					name: 'Vård & Omsorg',
					group: 6
				},
				{
					id: 33,
					name: 'Apotek',
					group: 6
				},
				{
					id: 34,
					name: 'Optik',
					group: 6
				},
				{
					id: 35,
					name: 'Skönhet',
					group: 6
				},
				{
					id: 36,
					name: 'Hälsa & Skönhet Övrigt',
					group: 6
				}
			]
		},
		{
			id: 7,
			name: 'Övrigt',
			tags: [
				{
					id: 37,
					name: 'Husdjur',
					group: 7
				},
				{
					id: 38,
					name: 'Välgörenhet',
					group: 7
				},
				{
					id: 39,
					name: 'Okatigoriserat',
					group: 7
				},
				{
					id: 40,
					name: 'Övrigt Övrigt',
					group: 7
				},
				{
					id: 41,
					name: 'Lån',
					group: 7
				}
			]
		}
	]
};
