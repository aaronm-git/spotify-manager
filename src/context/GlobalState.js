import React from 'react';
import GlobalContext from './GlobalContext';

export default function GlobalStateProvider({ children }) {
	const [user, setUser] = React.useState(null);
	const [tokenMetadata, setTokenMetadata] = React.useState(null);

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
				tokenMetadata,
				setTokenMetadata,
				resetGlobalState: () => {
					setUser(null);
					setTokenMetadata(null);
				},
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
