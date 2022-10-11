import React from 'react';
// components
import DataLayer from '../components/dashboard/DataLayer';
// providers
import TableDataProvider from '../context/dashboard/TableDataState';
export default function Dashboard() {
	return (
		<TableDataProvider>
			<DataLayer />
		</TableDataProvider>
	);
}
