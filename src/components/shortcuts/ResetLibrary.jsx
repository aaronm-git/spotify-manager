import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
// contexts
import TableDataContext from '../../context/dashboard/TableDataContext';
// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function ResetLibrary() {
	const [, setData] = React.useContext(TableDataContext);
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(['spotifySavedTracks']);
	function handleOnclick() {
		setData(data);
	}
	return (
		<Button size="lg" onClick={handleOnclick} className="mx-2">
			<FontAwesomeIcon icon={solid('undo-alt')} />
			<span className="mx-2">Reset</span>
		</Button>
	);
}
