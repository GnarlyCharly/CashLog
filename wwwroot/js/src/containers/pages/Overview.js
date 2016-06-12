import React, { Component, PropTypes } from 'react';
import {
	Tabs,
	Tab
} from 'material-ui';
import { connect } from 'react-redux';

// import css from './App.css';
// import LoadingIndicator from '../utils/LoadingIndicator';
// import { action_app_setActiveTabId } from '../actions/app';
// import { action_app_getUserInfo } from '../actions/app';
// import { getColorForCost } from '../utils/helper';

export class Overview extends Component {
	static propTypes = {
		activeTabId: PropTypes.number,
		userInfo: PropTypes.object,
		// userName: PropTypes.string,
		// userID: PropTypes.number,
		// isAdmin: PropTypes.bool,
		// totalCostThisMonth: PropTypes.number,
		// monthlyIncome: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'overview'
		};
		this.handleTabChange = ::this.handleTabChange;
	}

	handleTabChange(value){
		this.setState({activeTab: value});
	}

	render() {
		const tabsStle = { background: '#303030', color: '#ffffff' };
		return (
			<div>
				<Tabs
					value={this.state.activeTab}
					onChange={this.handleTabChange}
					>
					<Tab label="Ovewview" value='overview' style={tabsStle}>
						<div>

						</div>
					</Tab>
					<Tab label="Filter" value='filter' style={tabsStle}>
						<div>
							<h2 >Tab B</h2>
						</div>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const activeTabId = state.activeTabId;
	const userInfo = state.userInfo;
	return {
		activeTabId,
		userInfo
	};
}

export default connect(mapStateToProps)(Overview);
