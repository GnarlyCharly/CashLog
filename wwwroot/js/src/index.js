require('babel-polyfill');

import React from 'react';
import { render } from 'react-dom';

import Root from './Root';

render(<Root />, document.querySelector('#root'));
