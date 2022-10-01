import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import AlertContext from '../../context/alerts/AlertContext';

const PrivateRoute = (props) => {
	const queryClient = useQueryClient();
	const location = useLocation();
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const user = queryClient.getQueryData(['user']);
	if (user) {
		return <Route {...props} />;
	} else {
		setAlert('ERROR', 'You must be logged in to view this page');
		return <Redirect to={{ pathname: '/', state: { from: location } }} />;
	}
};

export default PrivateRoute;
