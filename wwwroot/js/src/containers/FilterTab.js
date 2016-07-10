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
	DatePicker,
	Toggle
} from 'material-ui';
import {
	grey400,
	grey900,
	fullWhite,
	blue500,
	grey600,
	grey500,
	lightBlue500,
	grey100,
	grey800
} from 'material-ui/styles/colors';
import { connect } from 'react-redux';

import css from './FilterTab.css';
import { action_app_saveFilter } from '../actions/app';

export class FilterTab extends Component {
	static propTypes = {
		fromDate: PropTypes.any,
		toDate: PropTypes.any,
		ascending: PropTypes.bool,
		dispatch: PropTypes.func.isRequired,
		onFilterChange: PropTypes.func
	}
	constructor(props) {
		super(props);

		this.state = {
			fromDate: props.fromDate,
			toDate: props.toDate,
			ascending: props.ascending
		};

		this.saveFilter = :: this.saveFilter;
		this.toggleAscending = :: this.toggleAscending;
	}

	saveFilter(){
		this.props.dispatch(action_app_saveFilter(
			this.state.fromDate,
			this.state.toDate,
			this.state.ascending
		));
		this.props.onFilterChange();
	}

	toggleAscending(event, val){
		event.stopPropagation();
		event.preventDefault();
	}



	render() {

		const {
			fromDate,
			toDate,
			ascending
		} = this.state;
		const textStyle = {
			color: grey500,
			fontSize: 18,
			fontWeight: 'bold',
			letterSpacing: 1.5
		};
		const ascendingStyle = {
			...textStyle
		};
		const descendingStyle = {
			...textStyle
		};
		if(ascending){
			ascendingStyle.color = grey100;
		}else{
			descendingStyle.color = grey100;
		}
		return (
			<div className={css.container}>
				<div className={css.row}>
					<div className={css.item} style={{width: '50%'}}>
						<DatePicker
							hintText="From"
							value={fromDate}
							style={{width: 100, display: 'inline-block'}}
							textFieldStyle={{width: 100}}
							onChange={(e, date) => this.setState({fromDate: date})} />
						<div style={textStyle}>From</div>
					</div>
					<div className={css.item} style={{width: '50%'}}>
						<DatePicker
							hintText="To"
							value={toDate}
							style={{width: 100, display: 'inline-block'}}
							textFieldStyle={{width: 100}}
							onChange={(e, date) => this.setState({toDate: date})}/>
						<div style={textStyle}>To</div>
					</div>
				</div>
				<div className={css.row} style={{textAlign: 'center'}}>
					<div className={css.item} style={{cursor: 'pointer'}} onClick={() => this.setState({ascending: !ascending})}>
						<div className={css.item}>
							<span style={descendingStyle}>Descending</span>
						</div>
						<div className={css.item} style={{paddingRight: 10, marginBottom: -7}}>
							<Toggle
								onToggle={this.toggleAscending}
								toggled={ascending}
							/>
						</div>
						<div className={css.item}>
							<span style={ascendingStyle}>Ascending</span>
						</div>
					</div>
				</div>
				<div className={css.row}>
					<RaisedButton
						label="Apply"
						style={{width: '100%'}}
						labelStyle={{fontSize: 18, color: lightBlue500}}
						onTouchTap={this.saveFilter}
					/>
				</div>
			</div>
		);
	};
}

function mapStateToProps(state) {
	const filter = state.filter;
	return {
		...filter
	};
}

export default connect(mapStateToProps)(FilterTab);
