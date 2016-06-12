import React, { Component, PropTypes } from 'react';
import {
	CircularProgress
} from 'material-ui';

import css from './LoadingIndicator.css';

export default class LoadingIndicator extends Component {
	static propTypes = {
		size: PropTypes.number,
		color: PropTypes.string
	};
	static defaultProps = {
		size: 2
	};

	constructor(props) {
		super(props);
	}


	render() {
		const {
			size
		} = this.props;
		const centerStyle = {};

		centerStyle.marginLeft = -(size * 70) / 2;
		centerStyle.marginTop = -(size * 70) / 2;

		return (
			<div className={css.overlay}>
				<div className={css.center} style={centerStyle}>
					<CircularProgress size={this.props.size} color={this.props.color}/>
				</div>
			</div>
		);
	}
}
