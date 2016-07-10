import React, { Component, PropTypes } from 'react';
import {
	CircularProgress
} from 'material-ui';

import css from './LoadingIndicator.css';

export default class LoadingIndicator extends Component {
	static propTypes = {
		size: PropTypes.number,
		color: PropTypes.string,
		overlay: PropTypes.bool
	};
	static defaultProps = {
		size: 2,
		overlay: true
	};

	constructor(props) {
		super(props);
	}


	render() {
		const {
			size,
			overlay
		} = this.props;
		const centerStyle = {};

		centerStyle.marginLeft = -(size * 70) / 2;
		centerStyle.marginTop = -(size * 70) / 2;

		const finalName = overlay ? css.overlay : null;

		return (
			<div className={finalName}>
				<div className={css.center} style={centerStyle}>
					<CircularProgress size={this.props.size} color={this.props.color}/>
				</div>
			</div>
		);
	}
}
