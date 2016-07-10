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
	List,
	ListItem,
	Avatar,
	IconMenu,
	MenuItem,
	Divider,
	DatePicker
} from 'material-ui';
import {
	grey400,
	grey900,
	fullWhite,
	blue500,
	grey600,
	lightBlue500,
	grey500
} from 'material-ui/styles/colors';
import { connect } from 'react-redux';

import FilterTab from '../FilterTab';
import LoadingIndicator from '../../utils/LoadingIndicator';
import { action_app_getOverviewGroups } from '../../actions/app';
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
		overviewGroups: PropTypes.array,
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
			activeTab: 'overview'
		};

		this.handleTabChange = :: this.handleTabChange;
		this.handleInfoClick = :: this.handleInfoClick;
	}

	handleTabChange(value){
		this.setState({activeTab: value});
	}

	handleInfoClick(e){
		e.preventDefault();
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		console.warn('kaka');
	}

	render() {
		const tabStyle = {background: grey900, color: lightBlue500};
		return (
			<div>
				<Tabs
					value={this.state.activeTab}
					onChange={this.handleTabChange}
					>
					<Tab label="Ovewview" value='overview' style={tabStyle}>
						{this.renderOverview()}
					</Tab>
					<Tab label="Filter" value='filter' style={tabStyle}>
						<FilterTab onFilterChange={() => this.setState({activeTab: 'overview'})}/>
					</Tab>
				</Tabs>
			</div>
		);
	}

	renderOverview(){
		const {
			overviewGroups,
			userInfo,
			dispatch
		} = this.props;

		if(!overviewGroups){
			dispatch(action_app_getOverviewGroups());
			return (
				<div style={{position: 'relative', height: 200}}>
					<LoadingIndicator overlay={false}/>
				</div>
			);
		}

		return (
			<div style={{ background: '#303030' }}>
				<List>
					{overviewGroups.map(g => {
						const groupSumStyle = {
							color: getColorForCost(g.sum, (userInfo.monthlyIncome / 10)).textColor,
							fontSize: 18,
							fontWeight: 'bold',
							letterSpacing: 1.5
						};
						return (
							<div key={g.groupId}>
								<ListItem
									primaryText={<div style={groupSumStyle}>{formatNumber(g.sum)}</div>}
									secondaryText={<div style={{color: fullWhite}}>{formatNumber(g.groupName)}</div>}
									primaryTogglesNestedList={true}
								//	leftIcon={<ActionInput />}
									leftAvatar={<Avatar backgroundColor={getColorForCost(g.sum, (userInfo.monthlyIncome / 10)).color} />}
									nestedItems={
										g.tags.map(t => {
											return (
												<ListItem
													key={t.tagId}
													primaryText={<span style={groupSumStyle}>{formatNumber(t.sum)}</span>}
													secondaryText={<div style={{color: fullWhite}}>{formatNumber(t.tagName)}</div>}
													primaryTogglesNestedList={true}
													leftAvatar={<Avatar icon={<ActionInput />} backgroundColor={getColorForCost(g.sum, (userInfo.monthlyIncome / 10)).color} />}
													nestedListStyle={{ background: grey600 }}
													nestedItems={
														t.logs.map(l => {
															return (
																<div key={l.id} style={{margin: '7px 7px 7px 72px', background: '#303030', borderRadius: 5}}>
																	<ListItem
																		primaryText={
																			<div>
																				<span style={groupSumStyle}>{formatNumber(l.cost)}</span>
																				<span style={{color: fullWhite, marginLeft: 10}}>{formatNumber(l.comment)}</span>
																			</div>
																		}
																		rightIconButton={rightIconMenu}
																		>
																		{/*logChild*/}
																	</ListItem>

																</div>
															);
														})
													}>
													{/*tagChild*/}
												</ListItem>
											);
										})
									}>
									{/*groupChild*/}
								</ListItem>
								<Divider />
							</div>
						);
					})}
				</List>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const overviewGroups = state.overviewGroups;
	const userInfo = state.userInfo;
	return {
		overviewGroups,
		userInfo
	};
}

export default connect(mapStateToProps)(Overview);
