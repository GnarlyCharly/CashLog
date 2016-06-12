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
	Divider
} from 'material-ui';
import { connect } from 'react-redux';

import css from './App.css';
import Overview from './pages/Overview';
import Todo from './pages/Todo';
import { getColorForCost, formatNumber } from '../utils/helper';

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
		dispatch: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);

		this.state = {
			drawerOpen: false,
			activePageId: 1
		};

		this.openDrawer = ::this.openDrawer;
		this.onDrawerRequestChange = ::this.onDrawerRequestChange;
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
		this.setState({
			activePageId: pageId,
			drawerOpen: false
		});
	}

	getActivePage(){
		const {
			activePageId
		} = this.state;
		return pages[activePageId];
	}
	render() {
		const {
			userName,
			isAdmin,
			totalCostThisMonth,
			monthlyIncome
		} = this.props.userInfo;
		const color = getColorForCost(totalCostThisMonth, monthlyIncome);

		const totalConstStyle = { color: color.textColor };
		const appBarStyle = { background: color.color };

		const ActivePage = this.getActivePage();

		return (
			<div>
				<AppBar
					title={userName}
					style={appBarStyle}
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
						<span style={totalConstStyle}>{formatNumber(totalCostThisMonth)}</span>
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
					{isAdmin ? (
						<MenuItem
							onTouchTap={() => this.setActivePage(5)}
							leftIcon={<HardwareSecurity/>}
							>Admin</MenuItem>
					) : (null)}
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
