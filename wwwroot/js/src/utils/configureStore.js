import immutableState from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

import rootReducer from '../state';
import DevTools from './devTools.js';

const isProd = process.env.NODE_ENV === 'production';

const middleware = [thunk];
if(!isProd) {
	// Checks so that we don't accidentaly mutate the state
	middleware.push(immutableState());
}

const storeEnhancers = [];
//if(__HOT__) {
	// Dev panel
storeEnhancers.push(DevTools.instrument());
storeEnhancers.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
//}

const finalCreateStore = compose(
	applyMiddleware(...middleware),
	...storeEnhancers
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../state', () => {
			const nextRootReducer = require('../state');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
