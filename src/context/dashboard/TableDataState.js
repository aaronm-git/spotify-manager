import React from 'react';
import TableDataContext from './TableDataContext';

export default function TableDataProvider({ children }) {
	return <TableDataContext.Provider value={React.useState([])}>{children}</TableDataContext.Provider>;
}
