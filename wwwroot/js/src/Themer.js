import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component, PropTypes } from 'react';
import {
	cyan500,
	cyan700,
	grey100,
	grey400,
	grey500,
	fullWhite,
	lightBlue500,
	grey900
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import { connect } from 'react-redux';

import App from './containers/App';
import { action_app_getUserInfo } from './actions/app';

export class Themer extends Component {
	static propTypes = {
		userInfo: PropTypes.object,
		dispatch: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
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

		const myTheme = {
			spacing: spacing,
			fontFamily: 'Roboto, sans-serif',
			palette: {
				primary1Color: lightBlue500,
				primary2Color: lightBlue500,
				primary3Color: grey400,
				accent1Color: lightBlue500,
				accent2Color: grey100,
				accent3Color: grey500,
				textColor: fullWhite,
				alternateTextColor: '#303030',
				canvasColor: grey900,
				borderColor: fade(fullWhite, 0.3),
				disabledColor: fade(fullWhite, 0.3),
				pickerHeaderColor: fade(fullWhite, 0.12),
				clockCircleColor: fade(fullWhite, 0.12)
			}
		};
		return (
			<div>
				<MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
					<App/>
				</MuiThemeProvider>
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

export default connect(mapStateToProps)(Themer);
