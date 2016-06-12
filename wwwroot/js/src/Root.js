import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';
import DevTools from './utils/devTools.js';
import Themer from './Themer';

const store = configureStore();

let devTools = null;

//if(__HOT__) {
devTools = <DevTools key='dev-tools' />;
//}
injectTapEventPlugin();

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<Themer/>
					{devTools}
				</div>
			</Provider>
		);
	}
}
