import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AppAlert from "./components/layout/AppAlert";
import Settings from "./pages/Settings";
// import TrackData from "../3-tracks.json";
// import TrackData from "./all-my-tracks.json";
import { GlobalState } from "./context/GlobalContext";
import SpotifyState from "./context/spotify/spotifyState";
import Callback from "./pages/Callback";
import NotFoundPage from "./pages/404";
import PrivateRoute from "./components/App/PrivateRoute";

const App = () => {
  return (
    <GlobalState>
      <SpotifyState>
        <Router>
          <Header />
          <AppAlert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/callback" component={Callback} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/settings" component={Settings} /> */}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </SpotifyState>
    </GlobalState>
  );
};

export default App;
