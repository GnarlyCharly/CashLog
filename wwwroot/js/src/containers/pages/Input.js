import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import React, { Component, PropTypes } from 'react';
import {
	Slider,
	Toggle,
	Stepper,
	StepButton,
	Step,
	TextField,
	List,
	ListItem,
	Divider,
	RaisedButton,
	AutoComplete,
	IconButton
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

import {
	action_app_getCommentsForTag
} from '../../actions/app';

let COMMENT_SEARCH_TIMEOUT;

export class Input extends Component {
	static propTypes = {
		tagGroups: PropTypes.array,
		comments: PropTypes.array,
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
			currentStep: 1,
			value: '',
			tagId: null,
			comment: ''
		};

		this.onValueChange = :: this.onValueChange;
		this.handleNewRequest = :: this.handleNewRequest;
		this.handleUpdateInput = :: this.handleUpdateInput;
	}

	onValueChange(val){
		const value = val.replace(/\s+/g, '');
		if(value === ''){
			this.setState({value: ''});
		}else if (!isNaN(value)){
			this.setState({value: parseInt(value)});
		}
	}

	onTagSelected(id){
		this.setState({tagId: id});
		setTimeout(() => {
			this.setState({currentStep: this.state.currentStep + 1});
		}, 200);
	}

	render() {
		const {
			currentStep
		} = this.state;
		const stepButtonStyle = {
			color: fullWhite
		};
		return (
			<div style={{padding: 10, background: '#303030'}}>
				<Stepper linear={false}>
					<Step completed={currentStep > 0} active={currentStep === 0}>
						<StepButton onClick={() => this.setState({currentStep: 0})}>
							<span style={stepButtonStyle}>Cost</span>
						</StepButton>
					</Step>
					<Step completed={currentStep > 1} active={currentStep === 1}>
						<StepButton onClick={() => this.setState({currentStep: 1})}>
							<span style={stepButtonStyle}>Tag</span>
						</StepButton>
					</Step>
					<Step completed={currentStep > 2} active={currentStep === 2}>
						<StepButton onClick={() => this.setState({currentStep: 2})}>
							<span style={stepButtonStyle}>Comment</span>
						</StepButton>
					</Step>
				</Stepper>
				{currentStep === 0 ? (
					this.renderInput())
				: (null)}
				{currentStep === 1 ? (
					this.renderTagGroups())
				: (null)}
				{currentStep === 2 ? (
					this.renderComment())
				: (null)}
			</div>
		);
	}
	renderInput(){
		const {
			value
		} = this.state;
		let silderValue = value;
		if(value === ''){
			silderValue = 0;
		}
		const add = () => this.setState({value: silderValue + 1 });
		let remove = () => this.setState({value: silderValue - 1 });
		if(silderValue === 0){
			remove = () => {};
		}
		return (
			<div style={{textAlign: 'center'}}>
				<div>
					<IconButton
						style={{marginRight: 20, width: 72, height: 72, padding: 16}}
						iconStyle={{width: 36, height: 36, color: lightBlue500}}
						onClick={remove}>
						<ContentRemove />
					</IconButton>
					<TextField
						id="value"
						hintText={'0'}
						value={value.toLocaleString()}
						onChange={ (skip, val) => this.onValueChange(val) }
						style={{width: 100, fontSize: 26}}
						hintStyle={{textAlign: 'center', left: 44}}
						inputStyle={{textAlign: 'center'}}
					/>
					<IconButton
						style={{marginLeft: 20, width: 72, height: 72, padding: 16}}
						iconStyle={{width: 36, height: 36, color: lightBlue500}}
						onClick={add}>
						<ContentAdd />
					</IconButton>
				</div>
				<div style={{paddingTop: 40}}>
					<RoundSlider value={silderValue} size={260} onChange={(val) => this.setState({value: val})}/>
				</div>

			</div>
		);
	}
	renderTagGroups(){
		const {
			tagGroups
		} = this.props;

		return (
			<div style={{ background: '#303030' }}>
				<List>
					{tagGroups.map(tg => {
						const selectedTab = tg.tags.find( t => t.id === this.state.tagId);
						const containsSelectedTab = selectedTab ? true : false;
						return (
							<div key={tg.id} style={{margin: '5px 10px 5px 10px', background: grey800}}>
								<ListItem
									primaryText={tg.name}
									primaryTogglesNestedList={true}
									initiallyOpen={containsSelectedTab}
									style={{textAlign: 'center'}}
									nestedListStyle={{padding: 5}}
									nestedItems={
										tg.tags.map(t => {
											return (
												<div key={t.id}>
													<RaisedButton
														label={t.name}
														fullWidth={true}
														primary={this.state.tagId === t.id}
														onClick={() => this.onTagSelected(t.id)}/>
												</div>
											);
										})
									}>
								</ListItem>
							</div>
						);
					})}
				</List>
			</div>
		);
	}
	handleNewRequest(chosenRequest){
		this.setState({comment: chosenRequest});
	}
	handleUpdateInput(searchText){

		const {
			tagId
		} = this.state;
		if(tagId == null){
			return;
		}

		if(searchText === ''){
			this.props.dispatch(action_app_getCommentsForTag(tagId, searchText));
			return;
		}

		clearTimeout(COMMENT_SEARCH_TIMEOUT);

		COMMENT_SEARCH_TIMEOUT = setTimeout(() => {
			this.props.dispatch(action_app_getCommentsForTag(tagId, searchText));
		}, 500);
	}
	renderComment(){
		const {
			comments
		} = this.props;
		const finalComments = comments || [];
		return (
			<div style={{textAlign: 'center'}}>
				<div style={{display: 'inline-block'}}>
					<AutoComplete
						id='comment'
						searchText={this.state.comment}
						dataSource={finalComments}
						onNewRequest={this.handleNewRequest}
						onUpdateInput={this.handleUpdateInput}
						filter={AutoComplete.caseInsensitiveFilter}
						//textareaStyle={{color: '#000', backgroundColor: fullWhite, borderRadius: 2, paddingLeft: 5, paddingRight: 5}}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const userInfo = state.userInfo;
	const tagGroups = state.tagGroups;
	const comments = state.comments;
	return {
		userInfo,
		tagGroups,
		comments
	};
}

export default connect(mapStateToProps)(Input);


class RoundSlider extends Component {
	static propTypes = {
		size: PropTypes.number,
		value: PropTypes.number,
		onChange: PropTypes.func.isRequired
	}
	static defaultProps = {
		size: 200,
		value: 0
	};
	constructor(props) {
		super(props);

		const newValue = props.value;
		const newLaps = Math.floor(newValue / 100);
		const value99 = newValue - newLaps * 100;

		this.state = {
			oldValue: value99,
			roundSliderLaps: newLaps
		};
	}
	componentDidMount(){

		const me = this;
		const endAngle = this.state.oldValue > 45 ? '+360' : '+180';
		const max = this.state.oldValue > 45 ? 99 : 50;
		setTimeout(() => {
			global.$('#slider').roundSlider({
				sliderType: 'min-range',
				handleShape: 'dot',
				width: 30,
				radius: this.props.size / 2,
				handleSize: '+25',
				startAngle: 270,
				endAngle: endAngle,
				max: max,
				editableTooltip: false,
				showTooltip: false,
				animation: true,
				keyboardAction: false,
				value: this.state.oldValue,
				drag: function (args) {
					// handle the drag event here
					me.handleValue(args.value);
				}
			});
		}, 1);
	}

	componentWillUnmount(){
		global.$('#slider').roundSlider('destroy');
	}

	componentWillReceiveProps(nextProps){

		const newValue = nextProps.value;
		const newLaps = Math.floor(newValue / 100);
		const value99 = newValue - newLaps * 100;
		if(value99 === this.state.oldValue && newLaps === this.state.roundSliderLaps){
			return;
		}
		this.setState({
			roundSliderLaps: newLaps,
			oldValue: value99
		});

		if(value99 > 0){
			global.$('#slider').roundSlider('option', 'endAngle', '+360');
			global.$('#slider').roundSlider('option', 'max', 99);
		}
		//disable going less than zero
		if(newLaps <= 0){
			if (value99 === 0) {
				global.$('#slider').roundSlider('option', 'endAngle', '+180');
				global.$('#slider').roundSlider('option', 'max', 50);
			}
		}
		global.$('#slider').roundSlider('option', 'value', value99);
	}
	shouldComponentUpdate(){
		return false;
	}

	handleValue(val){

		const {
			oldValue,
			roundSliderLaps
		} = this.state;
		let laps = roundSliderLaps;

		// add lap
		if(oldValue > 90 && oldValue <= 99 && val < 10 && val >= 0){
			laps++;
		}

		// remove lap
		else if(oldValue < 10 && oldValue >= 0 && val > 90 && val <= 99){
			laps--;
		}

		if(val > 40 && val <= 50){
			global.$('#slider').roundSlider('option', 'endAngle', '+360');
			global.$('#slider').roundSlider('option', 'max', 99);
		}
		//disable going less than zero
		if(laps <= 0){
			if (val > 20 && val <= 40) {
				global.$('#slider').roundSlider('option', 'endAngle', '+180');
				global.$('#slider').roundSlider('option', 'max', 50);
			}
		}

		const newValue = (100 * laps) + val;

		this.setState({
			oldValue: val,
			roundSliderLaps: laps
		});
		this.props.onChange(newValue);
	}

	render() {
		const {
			size
		} = this.props;

		const containerStyle = {
			width: size,
			marginLeft: 'auto',
			marginRight: 'auto'
		};
		return (
			<div>
				<div style={containerStyle}>
					<div id='slider'></div>
				</div>
			</div>
		);
	}


}
