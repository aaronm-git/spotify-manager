import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// components
import { Button, Spinner } from 'react-bootstrap';
import { BsFileMinusFill } from 'react-icons/bs';
// apis
import { deleteTracks } from '../../api/spotify';
// contexts
import { useSpotifyToken } from '../../hooks/spotifyHooks';
export default function DeleteDuplicates({ data, setData, setChecked }) {
	const spotifyToken = useSpotifyToken();
	const queryClient = useQueryClient();
	const cachedLibrary = queryClient.getQueryData(['spotifySavedTracks']);

	const { mutate, isLoading } = useMutation(
		() => {
			let duplicates = [...data].sort((a, b) => a.trackName.localeCompare(b.trackName));
			const uniqueTracks = [];
			duplicates = duplicates.filter((track) => {
				if (!uniqueTracks.includes(track.trackId)) {
					uniqueTracks.push(track.trackId);
					return true;
				} else {
					return false;
				}
			});
			return deleteTracks(spotifyToken, duplicates);
		},
		{
			onSuccess: (data) => {
				const newLibrary = cachedLibrary.filter((track) => !data.removedTrackIds.includes(track.trackId));
				queryClient.setQueryData(['spotifySavedTracks'], newLibrary);
				setData(cachedLibrary);
				setChecked(false);
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
					<BsFileMinusFill className="icon" />
					<span className="mx-2">Delete Duplicates</span>
				</>
			)}
		</Button>
	);
}
