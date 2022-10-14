import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// components
import { Button, Spinner } from 'react-bootstrap';
import { BsFileMinusFill } from 'react-icons/bs';
// apis
import { deleteTracks } from '../../api/spotify';
// contexts
import { useSpotifyToken } from '../../hooks/spotifyHooks';
// hooks
import { useAlert } from '../../hooks/alert';

export default function DeleteDuplicates({ data, setChecked }) {
	const spotifyToken = useSpotifyToken();
	const queryClient = useQueryClient();
	const { showAlert } = useAlert();

	const { mutate, isLoading } = useMutation(
		() => {
			const sortedTracks = [...data].sort((a, b) => a.trackName.localeCompare(b.trackName));
			const duplicateTracks = sortedTracks.filter((track, index, arr) => {
				const duplicateByTrackId = arr.filter((track2) => track2.trackId === track.trackId).length > 1;
				const duplicateByTrackNameAndArtistName =
					track.trackName === arr[index + 1]?.trackName && track.artistName === arr[index + 1]?.artistName;
				return duplicateByTrackId || duplicateByTrackNameAndArtistName;
			});
			console.log(duplicateTracks.reduce((acc, cur) => acc + cur.trackName + ',', ''));
			return deleteTracks(spotifyToken, duplicateTracks);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['spotifySavedTracks'], { exact: true });
				showAlert('SUCCESS', 'Duplicates have been deleted from your library.');
				setChecked(false);
			},
			onError: (error) => {
				showAlert('ERROR', error.message);
				console.log(error);
			},
		}
	);

	function handleOnClick() {
		const result = window.confirm('Are you sure you want to delete all duplicates? (y/n)');
		if (result) mutate();
	}

	return (
		<Button size="lg" variant="danger" onClick={handleOnClick} disabled={isLoading} className="mx-2">
			{isLoading ? (
				<Spinner animation="border" size="sm" variant="light" />
			) : (
				<>
					<BsFileMinusFill />
					<span className="mx-2">Delete Duplicates</span>
				</>
			)}
		</Button>
	);
}
