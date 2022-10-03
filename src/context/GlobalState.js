import React from 'react';
import GlobalContext from './GlobalContext';

export default function GlobalStateProvider({ children }) {
	const [user, setUser] = React.useState(null);

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
