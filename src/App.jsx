import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Header from "./components/global/Header";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import axios from "axios";

const base64Authorization = `${window.btoa(
  `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`
)}`;

const getAccessToken = (params) => {
  console.log(params);
  if (params.error) {
    console.error(params.error);
    alert(params.error);
  } else if (params.code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + params.code;
    body += "&redirect_uri=" + encodeURI("http://localhost:3000/callback/");
    console.log(body);
    axios
      .post(
        `https://accounts.spotify.com/api/token`,
        // {
        //   grant_type: "authorization_code",
        //   code: params.code,
        //   redirect_uri: encodeURI("http://localhost:3000/callback/"),
        // },
        body,
        {
          headers: {
            Authorization: "Basic " + base64Authorization,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  } else {
    alert("returning");
    return;
  }
};

const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + refreshToken;
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      // {
      //   grant_type: "refresh_token",
      //   refresh_token: refreshToken,
      // },
      body,
      {
        headers: {
          Authorization: "Basic " + base64Authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getCurrentUserProfile = () => {
  return axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // refresh token
        (async () => {
          await refreshAccessToken();
          getCurrentUserProfile();
        })();
      }
      console.error(error);
    });

  // {
  //   "country": "US",
  //   "display_name": "2aamspotify",
  //   "email": "2aaronmolina@gmail.com",
  //   "explicit_content": {
  //     "filter_enabled": false,
  //     "filter_locked": false
  //   },
  //   "external_urls": {
  //     "spotify": "https://open.spotify.com/user/2aamspotify"
  //   },
  //   "followers": {
  //     "href": null,
  //     "total": 3
  //   },
  //   "href": "https://api.spotify.com/v1/users/2aamspotify",
  //   "id": "2aamspotify",
  //   "images": [],
  //   "product": "premium",
  //   "type": "user",
  //   "uri": "spotify:user:2aamspotify"
  // }
};

const App = () => {
  const loggedIn = true;
  const [isAuth, setIsAuth] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (localStorage.getItem("access_token").length) {
      setIsAuth(true);
      (async () => {
        setUserProfile(await getCurrentUserProfile());
      })();
    }
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
        <Route path="/settings">{loggedIn ? <Settings isAuth={isAuth} /> : <Redirect to="/authenticate" />}</Route>
        <Route
          path="/callback"
          render={(props) => {
            getAccessToken(Object.fromEntries(new URLSearchParams(props.location.search)));
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
