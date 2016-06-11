import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';
import LogMonitor from 'redux-devtools-log-monitor';
import React from 'react';
import { createDevTools } from 'redux-devtools';

import css from './devTools.css';

const DevTools = createDevTools(
	<DockMonitor
		defaultIsVisible={false}
		toggleVisibilityKey='ctrl-h'
		changePositionKey='ctrl-q'
		changeMonitorKey='ctrl-m'
	>
		<LogMonitor theme='nicinabox' />
		<Inspector theme='nicinabox' />
	</DockMonitor>
);

const wrap = props => <div className={css.wrap}><DevTools {...props}/></div>;

wrap.instrument = DevTools.instrument;

export default wrap;
