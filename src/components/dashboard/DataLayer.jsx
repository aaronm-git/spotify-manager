import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// contexts
import GlobalContext from '../../context/GlobalContext';
import TableDataContext from '../../context/dashboard/TableDataContext';
// components
import BodyLayer from './BodyLayer';
// hooks
import { useAlert } from '../../hooks/alert';
// apis
import { getUserSavedTracks } from '../../api/spotify';

export default function DataLayer() {
	const accessToken = React.useContext(GlobalContext)?.tokenMetadata?.accessToken;
	const [, setData] = React.useContext(TableDataContext);
	const showAlert = useAlert();

	const { data, isLoading, isSuccess, isError } = useQuery(
		['spotifySavedTracks'],
		() => getUserSavedTracks(accessToken),
		{
			enabled: !!accessToken,
			retry: false,
			staleTime: Infinity,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		isError && showAlert('ERROR', 'There was an error fetching your saved tracks.');
		isSuccess && setData(data);
	}, [isError, isSuccess]);

	return <BodyLayer isLoading={isLoading} isError={isError} />;
}
