export const overviewGroups = [
	{
		groupId: 1,
		groupName: 'Mat & Dryck',
		sum: 466,
		tags: [
			{
				tagId: 1,
				tagName: 'Livsmedel',
				sum: 245,
				logs: [
					{
						id: 751,
						userID: 1,
						cost: 76,
						comment: 'Coop Coop Coop Coop Coop Coop Coop',
						date: '2016-06-12 15:47:49',
						shared: true,
						done: true,
						tagID: 1,
						tagName: 'Livsmedel',
						groupId: 1,
						groupName: 'Mat & Dryck'
					},
					{
						id: 753,
						userID: 1,
						cost: 169,
						comment: 'Coop',
						date: '2016-06-12 15:48:55',
						shared: true,
						done: true,
						tagID: 1,
						tagName: 'Livsmedel',
						groupId: 1,
						groupName: 'Mat & Dryck'
					}
				]
			},
			{
				tagId: 2,
				tagName: 'Restaurang',
				sum: 191,
				logs: [
					{
						id: 752,
						userID: 1,
						cost: 49,
						comment: 'Mcdonalds',
						date: '2016-06-12 15:48:01',
						shared: true,
						done: true,
						tagID: 2,
						tagName: 'Restaurang',
						groupId: 1,
						groupName: 'Mat & Dryck'
					},
					{
						id: 756,
						userID: 1,
						cost: 74,
						comment: 'Max',
						date: '2016-06-12 17:29:05',
						shared: true,
						done: true,
						tagID: 2,
						tagName: 'Restaurang',
						groupId: 1,
						groupName: 'Mat & Dryck'
					},
					{
						id: 757,
						userID: 1,
						cost: 68,
						comment: 'Coopbuffe',
						date: '2016-06-13 20:29:13',
						shared: true,
						done: true,
						tagID: 2,
						tagName: 'Restaurang',
						groupId: 1,
						groupName: 'Mat & Dryck'
					}
				]
			},
			{
				tagId: 3,
				tagName: 'Fika & Snacks',
				sum: 30,
				logs: [
					{
						id: 750,
						userID: 1,
						cost: 30,
						comment: 'Glass',
						date: '2016-06-12 15:46:57',
						shared: true,
						done: true,
						tagID: 3,
						tagName: 'Fika & Snacks',
						groupId: 1,
						groupName: 'Mat & Dryck'
					}
				]
			}
		]
	},
	{
		groupId: 2,
		groupName: 'Shopping',
		sum: 150,
		tags: [
			{
				tagId: 7,
				tagName: 'Hemelektronik',
				sum: 150,
				logs: [
					{
						id: 754,
						userID: 1,
						cost: 150,
						comment: 'Batterier - kell & co',
						date: '2016-06-12 15:49:21',
						shared: true,
						done: true,
						tagID: 7,
						tagName: 'Hemelektronik',
						groupId: 2,
						groupName: 'Shopping'
					}
				]
			}
		]
	},
	{
		groupId: 6,
		groupName: 'Hälsa & Skönhet',
		sum: 129,
		tags: [
			{
				tagId: 33,
				tagName: 'Apotek',
				sum: 129,
				logs: [
					{
						id: 755,
						userID: 1,
						cost: 129,
						comment: 'Myggmedel',
						date: '2016-06-12 15:49:45',
						shared: true,
						done: true,
						tagID: 33,
						tagName: 'Apotek',
						groupId: 6,
						groupName: 'Hälsa & Skönhet'
					}
				]
			}
		]
	}
];

export const logsWihtDate = [
	{
		date: '2016-07-09',
		day: 'Saturday'
	},
	{
		id: 830,
		userID: 1,
		cost: 216,
		comment: 'Coop',
		date: '2016-07-09 17:36:22',
		shared: false,
		done: true,
		tagID: 1,
		tagName: 'Livsmedel',
		groupId: 1,
		groupName: 'Mat & Dryck'
	},
	{
		date: '2016-07-07',
		day: 'Thursday'
	},
	{
		id: 823,
		userID: 1,
		cost: 119,
		comment: 'Väzzo',
		date: '2016-07-07 14:38:24',
		shared: false,
		done: true,
		tagID: 2,
		tagName: 'Restaurang',
		groupId: 1,
		groupName: 'Mat & Dryck'
	},
	{
		date: '2016-07-06',
		day: 'Wednesday'
	},
	{
		id: 822,
		userID: 1,
		cost: 287,
		comment: 'Golfdiskar',
		date: '2016-07-06 22:03:13',
		shared: false,
		done: true,
		tagID: 28,
		tagName: 'Hobby',
		groupId: 5,
		groupName: 'Fritid'
	},
	{
		date: '2016-07-03',
		day: 'Sunday'
	},
	{
		id: 815,
		userID: 1,
		cost: 66,
		comment: 'Mcdonalds',
		date: '2016-07-03 19:58:18',
		shared: false,
		done: true,
		tagID: 2,
		tagName: 'Restaurang',
		groupId: 1,
		groupName: 'Mat & Dryck'
	},
	{
		id: 814,
		userID: 1,
		cost: 599,
		comment: 'Golfskor - Sportamore',
		date: '2016-07-03 19:57:47',
		shared: false,
		done: true,
		tagID: 8,
		tagName: 'Sport & Fritidsartiklar',
		groupId: 2,
		groupName: 'Shopping'
	}
];
