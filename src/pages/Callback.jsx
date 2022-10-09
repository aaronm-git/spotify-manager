import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useURLQuery } from '../utils';
import { getToken, getUserProfile } from '../api/spotify';
import { Redirect } from 'react-router-dom';

// components
import Loading from '../components/layouts/Loading';

// Contexts
import GlobalContext from '../context/GlobalContext';
import AlertContext from '../context/alerts/AlertContext';

export default function Callback() {
	const search = useURLQuery();
	const spotifyCode = search.get('code');
	const { setTokenMetadata, setUser } = useContext(GlobalContext);
	const { setAlert } = useContext(AlertContext);

	const authQuery = useQuery(['authorization'], () => getToken(spotifyCode), {
		staleTime: Infinity,
		enabled: !!spotifyCode,
		onError: (error) => setAlert('ERROR', error.message),
		onSuccess: (data) => setTokenMetadata(data),
	});

	const userQuery = useQuery(['spotifyUser'], () => getUserProfile(authQuery?.data?.accessToken), {
		enabled: !!authQuery?.data?.accessToken,
		staleTime: 1000 * 60 * 5,
		onError: (error) => setAlert('ERROR', error.message),
		onSuccess: (data) => setUser(data),
	});

	useEffect(() => {
		if (authQuery.isSuccess && userQuery.isSuccess)
			setAlert('SUCCESS', 'Successfully logged in as ' + userQuery.data.display_name);
	}, [authQuery.isSuccess, userQuery.isSuccess]);

	if (!spotifyCode) return <Redirect to="/" />;

	if (authQuery.isError || userQuery.isError) return <Redirect to="/" />;

	if (authQuery.isLoading || userQuery.isLoading) return <Loading />;

	return <Redirect to="/dashboard" />;
}
