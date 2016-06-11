import ActionInput from 'material-ui/svg-icons/action/input';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import AvLibraryBooks  from 'material-ui/svg-icons/av/library-books';
import HardwareSecurity  from 'material-ui/svg-icons/hardware/security';
import React, { Component, PropTypes } from 'react';
import {
	AppBar,
	Drawer,
	MenuItem,
	IconButton,
	Divider,
	CircularProgress
} from 'material-ui';
import { connect } from 'react-redux';

import css from './App.css';
import Overview from './pages/Overview';
import { action_app_getUserInfo } from '../actions/app';
import { getColorForCost, formatNumber } from '../utils/helper';

export class Todo extends Component {
	render(){
		return(
			<div>
				Todo
				<CircularProgress size={2}/>
			</div>
		);
	}
}

const pages = {
	1: Todo,
	2: Overview,
	3: Todo,
	4: Todo,
	5: Todo
};

export class App extends Component {
	static propTypes = {
		userInfo: PropTypes.shape({
			userID: PropTypes.number,
			userName: PropTypes.string,
			isAdmin: PropTypes.bool,
			totalCostThisMonth: PropTypes.number,
			monthlyIncome: PropTypes.number
		}),
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
			drawerOpen: false,
			activePageId: 2
		};

		this.openDrawer = this.openDrawer.bind(this);
		this.onDrawerRequestChange = this.onDrawerRequestChange.bind(this);
		this.getActivePage = ::this.getActivePage;
	}

	openDrawer(){
		this.setState({drawerOpen: true});
	}

	onDrawerRequestChange(open, reason){
		if(reason === 'clickaway'){
			this.setState({drawerOpen: false});
		}else{
			console.warn(open, reason);
		}
	}

	setActivePage(pageId){
		this.setState({activePageId: pageId});
	}

	getActivePage(){
		const {
			activePageId
		} = this.state;
		return pages[activePageId];
	}
	render() {
		const {
			dispatch,
			userInfo
		} = this.props;

		if(!userInfo){
			dispatch(action_app_getUserInfo());
			return null;
		}



		const totalConstStyle = {};
		totalConstStyle.color = getColorForCost(userInfo.totalCostThisMonth, userInfo.monthlyIncome);


		const ActivePage = this.getActivePage();

		return (
			<div>
				<AppBar
					title={userInfo.userName}
					onLeftIconButtonTouchTap={this.openDrawer}
					iconElementRight={<IconButton><ActionPowerSettingsNew/></IconButton>}
					>
				</AppBar>
				<Drawer
					open={this.state.drawerOpen}
					docked={false}
					onRequestChange={this.onDrawerRequestChange}
					>
					<div className={css.menuItem}>
						<span style={totalConstStyle}>{formatNumber(14253155)}</span>
					</div>
					<Divider />
					<MenuItem
						onTouchTap={() => this.setActivePage(1)}
						leftIcon={<ActionInput/>}
						>Input</MenuItem>
					<MenuItem
						onTouchTap={() => this.setActivePage(2)}
						leftIcon={<ActionTrendingUp/>}
						>Overview</MenuItem>
					<MenuItem
						onTouchTap={() => this.setActivePage(3)}
						leftIcon={<AvLibraryBooks/>}
						>Logs</MenuItem>
					<Divider />
					<MenuItem
						onTouchTap={() => this.setActivePage(4)}
						leftIcon={<ActionSettings/>}
						>Settings</MenuItem>
					<Divider />
					<MenuItem
						onTouchTap={() => this.setActivePage(5)}
						leftIcon={<HardwareSecurity/>}
						>Admin</MenuItem>
				</Drawer>
				<div className={css.container}>
					<ActivePage/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const userInfo = state.userInfo;
	return {
		userInfo
	};
}

export default connect(mapStateToProps)(App);
