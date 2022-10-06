import axios from 'axios';

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

const base64Authorization = `${window.btoa(
	`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`
)}`;

/**
 * Gets the token from the Spotify API
 * @param { String } token  - The token to be used
 */

export const getToken = async (spotifyCode) => {
	const response = await axios({
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + base64Authorization,
		},
		data:
			'grant_type=authorization_code&code=' +
			spotifyCode +
			'&redirect_uri=' +
			process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
	});
	return {
		accessToken: response.data.access_token,
		expiresIn: response.data.expires_in,
		tokenType: response.data.token_type,
		refreshToken: response.data.refresh_token,
		scope: response.data.scope,
		expiresAt: Date.now() + response.data.expires_in * 1000,
	};
};

/**
 * Navigate to Spotify to authorize the user
 */

export const goAppAuthorization = () => {
	const getAuthorizationUrl = 'https://accounts.spotify.com/authorize';
	let url = getAuthorizationUrl;
	url += '?client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	url += '&response_type=code';
	url += `&redirect_uri=${
		process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://spotifyshortcuts.netlify.app'
	}/callback/`;
	url += '&scope=' + authScopes.join(' ');
	window.location.href = url;
};

/**
 * Gets a new token from the Spotify API
 */

export const getNewToken = async (code) => {
	return await axios({
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + base64Authorization,
		},
		data: 'grant_type=refresh_token&refresh_token=' + code,
	});
};

/**
 * Gets the user's profile from the Spotify API
 * @param { String } token  - The token to be used for authorization
 */

export const getUserProfile = async (token) => {
	const response = await axios({
		method: 'get',
		url: 'https://api.spotify.com/v1/me',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	return response.data;
};

/**
 * Gets the user's saved tracks from the Spotify API
 * @param { String } token  - The token to be used for authentication
 * @param { Number } limit  - The number of tracks to be returned
 * @param { String } market - The market to be used
 * @param { Number } offset - The offset to be used
 */

export const getUserSavedTracks = async (token, limit = 50, market = null, offset = null) => {
	const savedTracks = [];
	let total = 0;
	let nextUrl = null;
	do {
		const response = await axios({
			method: 'get',
			url: 'https://api.spotify.com/v1/me/tracks',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		savedTracks.push(...response.data.items);
		nextUrl = response.data.next;
		total = response.data.total;
	} while (nextUrl);
	return { savedTracks, total };
};

/**
 * Deletes tracks from the user's saved tracks
 * @param { Array } tracks  - The tracks to be deleted
 * @param { Number } limit  - The limit of tracks to be deleted at a time
 */

export const deleteTracks = async (tracks, limit = 50) => {
	const trackIds = tracks.map((track) => track.track.id);
	const trackIdsChunks = [];
	for (let i = 0; i < trackIds.length; i += limit) {
		trackIdsChunks.push(trackIds.slice(i, i + limit));
	}
	for (let i = 0; i < trackIdsChunks.length; i++) {
		await axios({
			method: 'delete',
			url: 'https://api.spotify.com/v1/me/tracks',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + base64Authorization,
			},
			data: {
				ids: trackIdsChunks[i],
			},
		});
	}
};

// Language: javascript
// Path: src/api/spotify.js
