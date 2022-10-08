import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// components
import SpotifySavedTracksTable from '../components/tables/SpotifySavedTracksTable';
import Loading from '../components/layouts/Loading';

// constants
import { SPOTIFY_USER_LIBRARY_TABLE_COLUMNS as COLUMNS } from '../constants/spotify';

// apis
import { getUserSavedTracks, getTestUserSavedTracks } from '../api/spotify';

// hooks
import { useSpotifyToken } from '../hooks/spotifyHooks';
import { useAlert } from '../hooks/alert';

// testing
const testing = false;

const Dashboard = () => {
	const queryClient = useQueryClient();
	const spotifyToken = useSpotifyToken();
	const showAlert = useAlert();

	const { data, isLoading, isSuccess, isError } = useQuery(
		['spotifySavedTracks'],
		() => (testing ? getTestUserSavedTracks(spotifyToken) : getUserSavedTracks(spotifyToken)),
		{
			retry: false,
			staleTime: Infinity,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		isError && showAlert('ERROR', 'There was an error fetching your saved tracks.');
	}, [isError]);

	return (
		<Card className="bg-dark text-white mt-2 shadow-lg">
			<Card.Body>
				<Card.Title className="fw-light border-bottom border-primary">Dashboard</Card.Title>
				{isLoading ? (
					<Loading />
				) : isSuccess ? (
					<SpotifySavedTracksTable columns={COLUMNS} data={data} />
				) : isError ? (
					<p>error</p>
				) : null}
			</Card.Body>
		</Card>
	);
};

export default Dashboard;
