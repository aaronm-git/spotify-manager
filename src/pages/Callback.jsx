import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useURLQuery } from '../utils';
import { getToken, getUserProfile } from '../api/spotify';
import { Redirect } from 'react-router-dom';
// components
import Loading from '../components/Layouts/Loading';

const Callback = () => {
	const search = useURLQuery();
	const spotifyCode = search.get('code');

	const tokenQuery = useQuery(['accessToken'], () => getToken(spotifyCode), {
		staleTime: Infinity,
		enabled: !!spotifyCode,
	});

	console.log(tokenQuery.data);

	const userQuery = useQuery(['user'], () => getUserProfile(tokenQuery?.data?.accessToken), {
		enabled: !!tokenQuery?.data?.accessToken,
		staleTime: 1000 * 60 * 5,
	});

	console.log(userQuery.data);

	if (tokenQuery.isError) {
		return <Redirect to="/" />;
	}

	if (tokenQuery.isLoading) {
		return <Loading />;
	}

	return <Redirect to="/" />;
};

export default Callback;
