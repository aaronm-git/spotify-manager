import React, { Fragment, useContext } from 'react';
// Shortcut components
import ShowDuplicates from './ShowDuplicatesToggle';
import ResetLibrary from './ResetLibrary';
import SyncLibrary from './SyncLibrary';
// contexts
import TableDataContext from '../../context/dashboard/TableDataContext';

export default function Index() {
	const [data, setData] = useContext(TableDataContext);

	return (
		<Fragment>
			<SyncLibrary />
			<ShowDuplicates data={data} setData={setData} />
			<ResetLibrary />
		</Fragment>
	);
}
