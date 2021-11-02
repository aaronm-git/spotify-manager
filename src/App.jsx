import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Header from "./components/global/Header";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import axios from "axios";

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

const renderCallback = (props) => {
  getAccessToken(Object.fromEntries(new URLSearchParams(props.location.search)));
  return <Redirect to="/" />;
};

const authorizeApp = () => {
  const getAuthorizationUrl = "https://accounts.spotify.com/authorize";
  let url = getAuthorizationUrl;
  url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  url += "&response_type=code";
  url += "&redirect_uri=http://localhost:3000/callback/";
  url += "&scope=" + authScopes.join(" ");
  window.location.href = url;
};

const getAccessToken = (params) => {
  if (params.error) {
    console.error(params.error);
  } else if (params.code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + params.code;
    body += "&redirect_uri=" + encodeURI("http://localhost:3000/callback/");
    console.log(body);
    axios
      .post(`https://accounts.spotify.com/api/token`, body, {
        headers: {
          Authorization: "Basic " + base64Authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("expires_in", response.data.expires_in);
        localStorage.setItem("received_on", new Date());
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error("Invalid params");
  }
};

const getRefreshAccessToken = () => {
  const receivedOn = new Date(localStorage.getItem("received_on"));
  const expiresIn = parseInt(localStorage.getItem("expires_in")) * 1000;
  if (new Date() > new Date(receivedOn.getTime() + expiresIn)) {
    const refreshToken = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refreshToken;
    axios
      .post("https://accounts.spotify.com/api/token", body, {
        headers: {
          Authorization: "Basic " + base64Authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("expires_in", response.data.expires_in);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const getCurrentUserProfile = () => {
  getRefreshAccessToken();
  return axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const App = () => {
  const loggedIn = true;
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    (async () => {
      setUserProfile(await getCurrentUserProfile());
    })();
  }, []);

  return (
    <Router>
      <Header userProfile={userProfile} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/authenticate" />}
        </Route>
        <Route path="/authenticate">{!loggedIn ? <Authenticate /> : <Redirect to="/" />}</Route>
        <Route path="/dashboard">{loggedIn ? <Dashboard /> : <Redirect to="/authenticate" />}</Route>
        <Route path="/settings">
          {loggedIn ? <Settings authorizeApp={authorizeApp} /> : <Redirect to="/authenticate" />}
        </Route>
        <Route path="/callback" render={renderCallback} />
      </Switch>
    </Router>
  );
};

export default App;
