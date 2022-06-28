import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import AuthorizeApp from "./components/AuthorizeApp";
import Dashboard from "./components/Dashboard";
import AppAlert from "./components/layout/AppAlert";
import Settings from "./components/Settings";
// import TrackData from "../3-tracks.json";
// import TrackData from "./all-my-tracks.json";
import { GlobalState } from "./context/GlobalContext";
import SpotifyState from "./context/spotify/spotifyState";
import Callback from "./components/spotify/Callback";
import CheckAuth from "./components/CheckAuth";
const App = () => {
  return (
    <GlobalState>
      <SpotifyState>
        <Router>
          <Header />
          <AppAlert />
          <Switch>
            <Route exact path="/" component={AuthorizeApp} />
            <Route exact path="/callback" component={Callback} />
            <CheckAuth>
              <Route exact path="/dashboard" component={Dashboard} />
              {/* <Route exact path="/settings" component={Settings} /> */}
            </CheckAuth>
          </Switch>
        </Router>
      </SpotifyState>
    </GlobalState>
  );
};

export default App;
