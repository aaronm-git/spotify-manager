import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/global/Header";
import AuthorizeApp from "./components/AuthorizeApp";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import axios from "axios";
import _ from "lodash";
// import TrackData from "../3-tracks.json";
import TrackData from "./all-my-tracks.json";

const base64Authorization = `${window.btoa(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`
)}`;

const authScopes = [
  //Images
  "ugc-image-upload",
  //Playlists
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  //Users
  "user-read-private",
  "user-read-email",
  //Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  //Library
  "user-library-modify",
  "user-library-read",
  //Listening History
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read",
  //Playback
  "app-remote-control",
  "streaming",
  //Follow
  "user-follow-modify",
  "user-follow-read",
];

const getRefreshAccessToken = async () => {
  if (localStorage.getItem("refresh_token")) {
    const receivedOn = new Date(localStorage.getItem("received_on"));
    const expiresIn = parseInt(localStorage.getItem("expires_in")) * 1000;
    if (new Date() > new Date(receivedOn.getTime() + expiresIn)) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        let body = "grant_type=refresh_token";
        body += "&refresh_token=" + refreshToken;
        const response = await axios.post("https://accounts.spotify.com/api/token", body, {
          headers: {
            Authorization: "Basic " + base64Authorization,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("expires_in", response.data.expires_in);
        localStorage.setItem("received_on", new Date());
      } catch (error) {
        console.error(error.message);
      }
    }
  }
};

const App = () => {
  const [isAppAuthorized, setIsAppAuthorized] = useState(localStorage.getItem("access_token") ? true : false);
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("user_profile")));
  const [savedTracksData, setSavedTracksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAppAuthorization = () => {
    const getAuthorizationUrl = "https://accounts.spotify.com/authorize";
    let url = getAuthorizationUrl;
    url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    url += "&response_type=code";
    url += "&redirect_uri=http://localhost:3000/callback/";
    url += "&scope=" + authScopes.join(" ");
    window.location.href = url;
  };

  const renderCallback = (props) => {
    getAccessToken(Object.fromEntries(new URLSearchParams(props.location.search)));
    return <Redirect to="/authorize" />;
  };

  const getAccessToken = (params) => {
    if (params.error) {
      console.error(params.error);
    } else if (params.code) {
      let body = "grant_type=authorization_code";
      body += "&code=" + params.code;
      body += "&redirect_uri=" + encodeURI("http://localhost:3000/callback/");
      return axios
        .post(`https://accounts.spotify.com/api/token`, body, {
          headers: {
            Authorization: "Basic " + base64Authorization,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("expires_in", response.data.expires_in);
          localStorage.setItem("received_on", new Date());
          setIsAppAuthorized(true);
          getCurrentUserProfile();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Invalid params");
    }
  };

  const getCurrentUserProfile = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });
      setUserProfile(response.data);
      localStorage.setItem("user_profile", JSON.stringify(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserSavedTracks = useCallback(async () => {
    setIsLoading(true);
    let savedTracks = TrackData;
    try {
      await getRefreshAccessToken();
      let hasNext = true;
      let loop = 0;
      let url = "https://api.spotify.com/v1/me/tracks?limit=50&market=US";
      // while (hasNext && loop <= 3) {
      //   loop++;
      //   const response = await axios.get(url, {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //     },
      //   });
      //   savedTracks = [...savedTracks, ...response.data.items];
      //   if (response.data.next) url = response.data.next;
      //   else hasNext = false;
      // }
    } catch (error) {
      console.error(error.message);
    }
    setIsLoading(false);
    setSavedTracksData(savedTracks);
  }, [setSavedTracksData]);

  useEffect(() => {
    if (isAppAuthorized) getUserSavedTracks();
  }, [isAppAuthorized, getUserSavedTracks]);

  return (
    <Router>
      <Header userProfile={userProfile} isAppAuthorized={isAppAuthorized} />
      <Switch>
        <Route path="/" exact>
          {isAppAuthorized ? <Redirect to="/dashboard" /> : <Redirect to="/authorize" />}
        </Route>
        <Route path="/authorize">
          {!isAppAuthorized ? (
            <AuthorizeApp getAppAuthorization={getAppAuthorization} isAuthorized={isAppAuthorized} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/dashboard">
          {isAppAuthorized ? (
            <Dashboard
              savedTracksData={savedTracksData}
              setSavedTracksData={setSavedTracksData}
              isLoading={isLoading}
            />
          ) : (
            <Redirect to="/authorize" />
          )}
        </Route>
        <Route path="/settings">{isAppAuthorized ? <Settings /> : <Redirect to="/authorize" />}</Route>
        <Route path="/callback" render={renderCallback} />
      </Switch>
    </Router>
  );
};

export default App;
