import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

// Contexts
import GlobalContext from '../../context/GlobalContext';

const PrivateRoute = (props) => {
	const location = useLocation();
	const globalContext = useContext(GlobalContext);
	const { tokenMetadata } = globalContext;

	if (!tokenMetadata) {
		return (
			<Redirect
				to={{
					pathname: '/',
					state: { from: location, alert: ['ERROR', 'You must be logged in to view this page!'] },
				}}
			/>
		);
	} else {
		return <Route {...props} />;
	}
};

export default PrivateRoute;
