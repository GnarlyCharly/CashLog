import React, { Component } from 'react';
import {
	Slider,
	Toggle
} from 'material-ui';
import { connect } from 'react-redux';

import { temp } from '../../actions/app';

export class Todo extends Component {
	render() {

		return (
			<div style={{padding: 100}}>
				Todo
				<Slider min={0} max={15} step={1} onChange={(mouse, val) => this.props.dispatch(temp(val))}/>
				<Toggle
					label="Simple"
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps)(Todo);
