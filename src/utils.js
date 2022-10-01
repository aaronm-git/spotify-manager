import React from 'react';
import { useLocation } from 'react-router-dom';

export function useURLQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}
