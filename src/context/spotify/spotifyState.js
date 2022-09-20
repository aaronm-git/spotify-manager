import React, { useReducer, useEffect, useContext, useState } from 'react';
import SpotifyContext from './spotifyContext';
import SpotifyReducer from './spotifyReducer';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import GlobalContext from '../GlobalContext';
import { FaSkull } from 'react-icons/fa';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import localizedFormat from 'dayjs/plugin/localizedFormat';
// import allTracks from "../../data/allTracks.json";

dayjs.extend(isBetween);
dayjs.extend(localizedFormat);

const authScopes = [
	//Images
	// "ugc-image-upload",

	//Playlists
	// "playlist-modify-private",
	// "playlist-read-private",
	// "playlist-modify-public",
	// "playlist-read-collaborative",

	//Users
	'user-read-private',
	'user-read-email',

	//Spotify Connect
	// "user-read-playback-state",
	// "user-modify-playback-state",
	// "user-read-currently-playing",

	//Library
	'user-library-modify',
	'user-library-read',

	//Listening History
	// "user-read-playback-position",
	// "user-read-recently-played",
	// "user-top-read",

	//Playback
	// "app-remote-control",
	// "streaming",

	//Follow
	// "user-follow-modify",
	// "user-follow-read",
];

const base64Authorization = `${window.btoa(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`)}`;

const initialState = JSON.parse(localStorage.getItem('state')) || {
	expires_in: '',
	token_updated: '',
	refresh_token: '',
	user: null,
	dupIds: [],
};

const SpotifyState = ({ children }) => {
	const [spotifyLibrary, setSpotifyLibrary] = useState([]);
	const [accessToken, setAccessToken] = useState('');
	const [state, dispatch] = useReducer(SpotifyReducer, initialState);
	const { alert, setAlert, setLoading, setLoadingInfo } = useContext(GlobalContext);
	const history = useHistory();

	useEffect(() => {
		localStorage.setItem('state', JSON.stringify(state));
	}, [state]);

	const isTokenStale = async () => {
		let newToken = '';
		if (state.refresh_token) {
			const then = dayjs(state.token_updated);
			const expiry = dayjs(then.add(state.expires_in, 'seconds'));
			const now = dayjs();
			const NotExpired = now.isBetween(then, expiry, 'millisecond', '[]');
			if (NotExpired || accessToken === '') newToken = await refreshToken();
		} else {
			localStorage.clear();
			history.push('/');
		}
		return newToken;
	};

	const refreshToken = async () => {
		let newToken = '';
		try {
			let body = 'grant_type=refresh_token';
			body += '&refresh_token=' + state.refresh_token;
			const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
				headers: {
					Authorization: 'Basic ' + base64Authorization,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			newToken = response.data.access_token;
			setAccessToken(newToken);
			dispatch({
				type: 'REFRESH_TOKEN',
				payload: {
					// access_token: response.data.access_token,
					expires_in: response.data.expires_in,
				},
			});
		} catch (error) {
			console.error(error);
		}
		return newToken;
	};

	const renderCallback = (props) => {
		getAccessToken(Object.fromEntries(new URLSearchParams(props.location.search)));
		return <Redirect to="/authorize" />;
	};

	const getAppAuthorization = () => {
		try {
			const getAuthorizationUrl = 'https://accounts.spotify.com/authorize';
			let url = getAuthorizationUrl;
			url += '?client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
			url += '&response_type=code';
			url += `&redirect_uri=${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://spotifyshortcuts.netlify.app'}/callback/`;
			url += '&scope=' + authScopes.join(' ');
			window.location.href = url;
		} catch (error) {
			setAlert({ variant: 'danger', icon: <FaSkull />, msg: error.message, show: true });
		}
	};

	const getAccessToken = async (code) => {
		setLoading(true);
		try {
			let body = 'grant_type=authorization_code';
			body += '&code=' + code;
			body += '&redirect_uri=' + encodeURI(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://spotifyshortcuts.netlify.app'}/callback/`);

			setLoadingInfo('Requesting token');
			const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
				headers: {
					Authorization: 'Basic ' + base64Authorization,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			const userResponse = await axios.get('https://api.spotify.com/v1/me', {
				headers: {
					authorization: `Bearer ${response.data.access_token}`,
					'Content-Type': 'application/json',
				},
			});
			dispatch({
				type: 'GET_TOKEN_GET_USER',
				payload: {
					access_token: response.data.access_token,
					refresh_token: response.data.refresh_token,
					expires_in: response.data.expires_in,
					user: userResponse.data,
				},
			});
		} catch (error) {
			console.error(error);
			setAlert({ ...alert, variant: 'danger', msg: error.message, icon: <FaSkull className="mb-1" />, show: true });
		}
		setLoading(false);
	};

	const getCurrentUserProfile = async () => {
		try {
			const refreshedToken = await isTokenStale();
			const response = await axios.get('https://api.spotify.com/v1/me', {
				headers: {
					authorization: `Bearer ${refreshedToken ? refreshedToken : state.access_token}}`,
					'Content-Type': 'application/json',
				},
			});
			dispatch({ type: 'GET_CURRENT_USER', payload: response.data });
			return;
		} catch (error) {
			console.error(error);
			setAlert({ variant: 'danger', msg: error.message, icon: <FaSkull />, show: true });
		}
	};

	const getUserSavedTracks = async () => {
		setLoading(true);
		// let savedTracks = [...allTracks];
		let savedTracks = [];
		let currentTrackNum = 0;
		let totalTrackNum = 0;

		try {
			const refreshedToken = await isTokenStale();
			let hasNext = true;
			let loop = 0;
			let url = 'https://api.spotify.com/v1/me/tracks?limit=50&market=US';
			while (hasNext) {
				loop++;
				const response = await axios.get(url, {
					headers: {
						authorization: `Bearer ${refreshedToken.length ? refreshedToken : accessToken}`,
					},
				});
				savedTracks = [...savedTracks, ...response.data.items];
				currentTrackNum += response.data.items.length;
				totalTrackNum = response.data.total;
				let loadingInfo = `Tracks Loaded ${currentTrackNum}/${totalTrackNum}`;
				if (response.data.next) url = response.data.next;
				else hasNext = false;
				setLoadingInfo(loadingInfo);
			}
			// dispatch({ type: "GET_LIBRARY", payload: savedTracks });
		} catch (error) {
			console.error(error.message);
		}
		setLoading(false);
		setLoadingInfo('');

		// Process tracks
		savedTracks = savedTracks.map((data) => ({
			trackId: data.track.id,
			artistId: data.track.artists[0].id,
			albumId: data.track.album.id,
			trackName: data.track.name,
			albumName: data.track.album.name,
			artistName: data.track.artists[0].name,
			trackUri: data.track.uri,
			artistUri: data.track.artists[0].uri,
			albumUri: data.track.album.uri,
			trackData: data.track,
		}));

		return savedTracks;
	};

	return (
		<SpotifyContext.Provider
			value={{
				...state,
				spotifyLibrary,
				setSpotifyLibrary,
				renderCallback,
				getAppAuthorization,
				getAccessToken,
				getCurrentUserProfile,
				getUserSavedTracks,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export default SpotifyState;
