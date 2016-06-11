import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';
import App from './containers/App';
import DevTools from './utils/devTools.js';

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
					<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
						<App/>
					</MuiThemeProvider>
					{devTools}
				</div>
			</Provider>
		);
	}
}
