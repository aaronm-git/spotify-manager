import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export const useSpotifyToken = () => {
	const globalContext = useContext(GlobalContext);
	return globalContext.tokenMetadata.accessToken;
};

export const useSpotifyUser = () => {
	const globalContext = useContext(GlobalContext);
	return globalContext.user;
};
