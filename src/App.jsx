import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import AuthorizeApp from "./components/AuthorizeApp";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
// import TrackData from "../3-tracks.json";
// import TrackData from "./all-my-tracks.json";
import SpotifyProvider from "./context/spotify/spotifyState";

const App = () => {
  const spotifyProvider = useContext(SpotifyProvider);
  return (
    <SpotifyProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={AuthorizeApp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/callback" render={spotifyProvider.renderCallback} />
        </Switch>
      </Router>
    </SpotifyProvider>
  );
};

export default App;
