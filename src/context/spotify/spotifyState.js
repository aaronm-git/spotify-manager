import React, { useReducer, useEffect, useContext } from "react";
import SpotifyContext from "./spotifyContext";
import SpotifyReducer from "./spotifyReducer";
import axios from "axios";
import { Redirect } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { FaSkull } from "react-icons/fa";

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

const initialState = JSON.parse(localStorage.getItem("state")) || {
  expires_in: "",
  token_updated: "",
  access_token: "",
  refresh_token: "",
  user: null,
  savedTracks: [],
  dupIds: [],
};

const SpotifyState = ({ children }) => {
  const [state, dispatch] = useReducer(SpotifyReducer, initialState);
  const { alert, setAlert, setLoading, setLoadingInfo } = useContext(GlobalContext);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const refreshStaleToken = () => {
    console.log("refreshStaleToken() fired");
    if (state.refresh_token.length) {
      console.log(state.token_updated, new Date(state.token_updated));
      const expired =
        new Date(state.token_updated).setSeconds(new Date(state.token_updated).getSeconds() + state.expires_in) >=
        new Date();
      if (expired) refreshToken();
    }
  };
  const refreshToken = async () => {
    console.log("refreshToken() fired");
    setLoading(true);
    try {
      let body = "grant_type=refresh_token";
      body += "&code=" + state.refresh_token;
      const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
        headers: {
          Authorization: "Basic " + base64Authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      dispatch({
        type: "REFRESH_TOKEN",
        payload: {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
        },
      });
    } catch (error) {
      console.error(error);
      setAlert({ variant: "danger", icon: <FaSkull />, msg: error.message, show: true });
    }
    setLoading(false);
  };

  const renderCallback = (props) => {
    console.log("renderCallback() fired");
    getAccessToken(Object.fromEntries(new URLSearchParams(props.location.search)));
    return <Redirect to="/authorize" />;
  };

  const getAppAuthorization = () => {
    console.log("getAppAuthorization() fired");
    try {
      const getAuthorizationUrl = "https://accounts.spotify.com/authorize";
      let url = getAuthorizationUrl;
      url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      url += "&response_type=code";
      url += `&redirect_uri=${
        process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://spotifyshortcuts.netlify.app"
      }/callback/`;
      url += "&scope=" + authScopes.join(" ");
      window.location.href = url;
    } catch (error) {
      setAlert({ variant: "danger", icon: <FaSkull />, msg: error.message, show: true });
    }
  };

  const getAccessToken = async (code) => {
    console.log("getAccessToken() fired");
    setLoading(true);
    try {
      let body = "grant_type=authorization_code";
      body += "&code=" + code;
      body +=
        "&redirect_uri=" +
        encodeURI(
          `${
            process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://spotifyshortcuts.netlify.app"
          }/callback/`
        );

      setLoadingInfo("Requesting token");
      const response = await axios.post(`https://accounts.spotify.com/api/token`, body, {
        headers: {
          Authorization: "Basic " + base64Authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const userResponse = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "GET_TOKEN_GET_USER",
        payload: {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in,
          user: userResponse.data,
        },
      });
    } catch (error) {
      console.error(error);
      setAlert({ ...alert, variant: "danger", msg: error.message, icon: <FaSkull className="mb-1" />, show: true });
    }
    setLoading(false);
  };

  const getCurrentUserProfile = async () => {
    console.log("getCurrentUserProfile() fired");
    try {
      refreshStaleToken();
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "GET_CURRENT_USER", payload: response.data });
      return;
    } catch (error) {
      console.error(error);
      setAlert({ variant: "danger", msg: error.message, icon: <FaSkull />, show: true });
    }
  };

  const getUserSavedTracks = async () => {
    console.log("getUserSavedTracks() fired");
    refreshStaleToken();
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

    dispatch({ type: "GET_LIBRARY", payload: { savedTracks } });
  };

  return (
    <SpotifyContext.Provider
      value={{
        ...state,
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
