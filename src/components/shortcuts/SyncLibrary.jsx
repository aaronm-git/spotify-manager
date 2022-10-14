import React from 'react';
import { useQueryClient, useIsFetching } from '@tanstack/react-query';
// components
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect } from 'react';

export default function SyncLibrary() {
	const queryClient = useQueryClient();
	const isFetching = useIsFetching(['spotifySavedTracks']);
	const handleClick = () => queryClient.invalidateQueries('spotifySavedTracks');
	return (
		<Button size="lg" className="me-2 position-relative" onClick={handleClick}>
			<Spinner
				animation="border"
				style={{
					display: isFetching ? 'inline-block' : 'none',
					position: 'absolute',
					left: '50%',
					marginLeft: '-1rem',
				}}
			/>
			<div className={isFetching && 'invisible'}>
				<FontAwesomeIcon icon={solid('sync')} />
				<span className="mx-2">Sync Library</span>
			</div>
		</Button>
	);
}
