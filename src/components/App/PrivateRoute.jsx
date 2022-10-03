import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import AlertContext from '../../context/alerts/AlertContext';

const PrivateRoute = (props) => {
	const location = useLocation();
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData(['user']);

	useEffect(() => {
		if (!user) setAlert('ERROR', 'You must be logged in to view this page');
	}, []);

	if (user) {
		return <Route {...props} />;
	} else {
		return <Redirect to={{ pathname: '/', state: { from: location } }} />;
	}
};

export default PrivateRoute;
