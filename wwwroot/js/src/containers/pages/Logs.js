import ActionInput from 'material-ui/svg-icons/action/info-outline';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import React, { Component, PropTypes } from 'react';
import {
	Tabs,
	Tab,
	Card,
	CardHeader,
	CardText,
	CardActions,
	FlatButton,
	RaisedButton,
	IconButton,
	Subheader,
	List,
	ListItem,
	Avatar,
	IconMenu,
	MenuItem,
	Divider,
	DatePicker,
	Toggle,
	Paper
} from 'material-ui';
import {
	grey400,
	grey900,
	fullWhite,
	blue500,
	grey600,
	grey500,
	lightBlue500,
	grey800
} from 'material-ui/styles/colors';
import { connect } from 'react-redux';

import FilterTab from '../FilterTab';
import LoadingIndicator from '../../utils/LoadingIndicator';
import { action_app_getLogsWithDate } from '../../actions/app';
import { getColorForCost, formatNumber } from '../../utils/helper';

// import css from './App.css';
// import LoadingIndicator from '../utils/LoadingIndicator';
// import { action_app_setActiveTabId } from '../actions/app';
// import { action_app_getUserInfo } from '../actions/app';
// import { getColorForCost } from '../utils/helper';
const iconButtonElement = (
	<IconButton
		touch={true}
		tooltipPosition="bottom-left"
	>
		<MoreVertIcon color={grey400} />
	</IconButton>
);
const rightIconMenu = (
	<IconMenu iconButtonElement={iconButtonElement}>
		<MenuItem style={{color: lightBlue500}}>Edit</MenuItem>
		<MenuItem style={{color: lightBlue500}}>Delete</MenuItem>
	</IconMenu>
);

export class Overview extends Component {
	static propTypes = {
		logs: PropTypes.array,
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
			activeTab: 'logs'
		};

		this.handleTabChange = :: this.handleTabChange;
	}

	handleTabChange(value){
		this.setState({activeTab: value});
	}

	render() {
		const tabStyle = {background: grey900, color: lightBlue500};
		return (
			<div>
				<Tabs
					value={this.state.activeTab}
					onChange={this.handleTabChange}
					>
					<Tab label="Logs" value='logs' style={tabStyle}>
						{this.renderLogs()}
					</Tab>
					<Tab label="Filter" value='filter' style={tabStyle}>
						<FilterTab onFilterChange={() => this.setState({activeTab: 'logs'})}/>
					</Tab>
				</Tabs>
			</div>
		);
	}
	renderLogs(){
		const {
			logs,
			userInfo,
			dispatch
		} = this.props;
		if(!logs){
			dispatch(action_app_getLogsWithDate());
			return (
				<div style={{position: 'relative', height: 200}}>
					<LoadingIndicator overlay={false}/>
				</div>
			);
		}
		return(
			<div style={{ background: '#303030' }}>
				<List>
					{logs.map((log, i) => {
						if(log.day){
							return (
								<div key={i}>
									<Subheader>{log.day} - {log.date}</Subheader>
								</div>
							);
						}
						return (
							<div key={i} style={{margin: '5px 10px 5px 10px', background: grey800}}>
								<ListItem
									primaryText={log.cost}
									leftAvatar={<Avatar backgroundColor={getColorForCost(log.cost, (userInfo.monthlyIncome / 10)).color} />}
									rightIconButton={rightIconMenu}
									secondaryText={
										<p style={{color: '#fff'}}>
											<span style={{color: grey500}}>{log.groupName} - {log.tagName}</span><br />
											{log.comment}
										</p>
									}
									secondaryTextLines={2}
									/>
							</div>
						);
					})}
				</List>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const logs = state.logs;
	const userInfo = state.userInfo;
	return {
		logs,
		userInfo
	};
}

export default connect(mapStateToProps)(Overview);
