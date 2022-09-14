import React from 'react';

import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import ReactDOM from 'react-dom';
import App from './App';
import './css/global.css';
import '././css/theme.min.css';

Amplify.configure(awsconfig);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
