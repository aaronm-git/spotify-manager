import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

// Contexts
import GlobalContext from '../../context/GlobalContext';
import AlertContext from '../../context/alerts/AlertContext';

const PrivateRoute = (props) => {
	const location = useLocation();
	const globalContext = useContext(GlobalContext);
	const alertContext = useContext(AlertContext);
	const { tokenMetadata } = globalContext;
	const { setAlert } = alertContext;

	if (!tokenMetadata) {
		setAlert('ERROR', 'You must be logged in to view this page');
		return <Redirect to={{ pathname: '/', state: { from: location } }} />;
	} else {
		return <Route {...props} />;
	}
};

export default PrivateRoute;
