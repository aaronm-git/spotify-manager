import React, { Fragment, useContext } from 'react';
// components
import Shortcuts from '../Shortcuts';
import SpotifySavedTracksTable from '../tables/SpotifySavedTracksTable';
// constants
import { SPOTIFY_USER_LIBRARY_TABLE_COLUMNS as COLUMNS } from '../../constants/spotify';
// contexts
import TableDataContext from '../../context/dashboard/TableDataContext';

export default function ContentLayer() {
	const [data] = useContext(TableDataContext);
	return (
		<Fragment>
			<Shortcuts />
			<SpotifySavedTracksTable columns={COLUMNS} data={data} />
		</Fragment>
	);
}
