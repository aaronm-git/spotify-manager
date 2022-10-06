import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// components
import SpotifySavedTracksTable from '../components/Tables/SpotifySavedTracksTable';

// constants
import { SPOTIFY_USER_LIBRARY_TABLE_COLUMNS as COLUMNS } from '../constants/spotify';

// apis
import { getUserSavedTracks } from '../api/spotify';
import Loading from '../components/Layouts/Loading';

// hooks
import { useSpotifyToken } from '../hooks/spotifyHooks';
import { useAlert } from '../hooks/alert';

const Dashboard = () => {
	const queryClient = useQueryClient();
	const spotifyToken = useSpotifyToken();
	const showAlert = useAlert();

	const { data, isLoading, isSuccess, isError } = useQuery(
		['spotifySavedTracks'],
		() => getUserSavedTracks(spotifyToken),
		{
			staleTime: 1000 * 60 * 60 * 24,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		return () => {
			queryClient.removeQueries(['spotifySavedTracks']);
		};
	}, []);

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
