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
	try {
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
		};
	} catch (error) {
		console.error(error);
	}
};

/**
 * Navigate to Spotify to authorize the user
 */

export const goAppAuthorization = () => {
	try {
		const getAuthorizationUrl = 'https://accounts.spotify.com/authorize';
		let url = getAuthorizationUrl;
		url += '?client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
		url += '&response_type=code';
		url += `&redirect_uri=${
			process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://spotifyshortcuts.netlify.app'
		}/callback/`;
		url += '&scope=' + authScopes.join(' ');
		window.location.href = url;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Gets a new token from the Spotify API
 */

export const getNewToken = (code) => {
	try {
		return axios({
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + base64Authorization,
			},
			data: 'grant_type=refresh_token&refresh_token=' + code,
		});
	} catch (error) {
		console.error(error);
	}
};

/**
 * Gets the user's profile from the Spotify API
 */

export const getUserProfile = async (token) => {
	try {
		const response = axios({
			method: 'get',
			url: 'https://api.spotify.com/v1/me',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Gets the user's saved tracks from the Spotify API
 */

export const getUserSavedTracks = async (limit = 50) => {
	console.log("Getting user's saved tracks");
	try {
		const savedTracks = [];
		let total = 0;
		let nextUrl = null;
		do {
			const response = await axios({
				method: 'get',
				url: 'https://api.spotify.com/v1/me/tracks?limit=' + limit,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + base64Authorization,
				},
			});
			savedTracks.push(...response.data.items);
			nextUrl = response.data.next;
			total = response.data.total;
		} while (nextUrl);
		return { savedTracks, total };
	} catch (error) {
		console.error(error);
	}
};

/**
 * Deletes tracks from the user's saved tracks
 * @param { Array } tracks  - The tracks to be deleted
 * @param { Number } limit  - The limit of tracks to be deleted at a time
 */

export const deleteTracks = async (tracks, limit = 50) => {
	try {
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
	} catch (error) {
		console.error(error);
	}
};

// Language: javascript
// Path: src/api/spotify.js
