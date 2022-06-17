import React, { useReducer } from "react";
import SpotifyContext from "./spotifyContext";
import SpotifyReducer from "./spotifyReducer";
import axios from "axios";
import { Redirect } from "react-router-dom";

const authScopes = [
  //Images
  // "ugc-image-upload",

  //Playlists
  // "playlist-modify-private",
  // "playlist-read-private",
  // "playlist-modify-public",
  // "playlist-read-collaborative",

  //Users
  "user-read-private",
  "user-read-email",

  //Spotify Connect
  // "user-read-playback-state",
  // "user-modify-playback-state",
  // "user-read-currently-playing",

  //Library
  "user-library-modify",
  "user-library-read",

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

const initialState = {
  accessToken: "",
  refreshToken: "",
  user: {},
  library: [],
  dupIds: [],
};

export const SpotifyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SpotifyReducer, initialState);

  const renderCallback = (props) => {
    getAccessToken(Object.fromEntries(new URLSearchParams(props.location.search)));
    return <Redirect to="/authorize" />;
  };

  const getAppAuthorization = () => {
    const getAuthorizationUrl = "https://accounts.spotify.com/authorize";
    let url = getAuthorizationUrl;
    url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    url += "&response_type=code";
    url += `&redirect_uri=${
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://spotifyshortcuts.netlify.app"
    }/callback/`;
    url += "&scope=" + authScopes.join(" ");
    window.location.href = url;
  };

  const getAccessToken = (params) => {
    let body = "grant_t ype=authorization_code";
    body += "&code=" + params.code;
    body +=
      "&redirect_uri=" +
      encodeURI(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://spotifyshortcuts.netlify.app"
        }/callback/`
      );
    axios
      .post(`https://accounts.spotify.com/api/token`, body, {
        headers: {
          Authorization: "Basic " + base64Authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        dispatch({
          type: "GET_TOKEN",
          payload: {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          },
        });
      });
  };

  const getCurrentUserProfile = async () => {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "GET_CURRENT_USER", payload: response.data });
    localStorage.setItem("user_profile", JSON.stringify(response.data));
  };

  const getUserSavedTracks = async () => {
    let savedTracks = [];
    let hasNext = true;
    let loop = 0;
    let url = "https://api.spotify.com/v1/me/tracks?limit=50&market=US";
    while (hasNext) {
      loop++;
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      savedTracks = [...savedTracks, ...response.data.items];
      if (response.data.next) url = response.data.next;
      else hasNext = false;
    }

    savedTracks = savedTracks.map((data) => ({
      id: data.track.id,
      trackName: data.track.name,
      albumName: data.track.album.name,
      artistName: data.track.artists[0].name,
      trackUri: data.track.uri,
      artistUri: data.track.artists[0].uri,
      albumUri: data.track.album.uri,
      trackData: data.track,
    }));

    dispatch({ type: "GET_LIBRARY", payload: { library: savedTracks } });
  };

  return (
    <SpotifyContext.Provider
      value={{
        authenticated: state.authenticated,
        library: state.library,
        dupIds: state.dupIds,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyProvider;
