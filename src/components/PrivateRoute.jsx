import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import SpotifyContext from "../context/spotify/spotifyContext";
import GlobalContext from "../context/GlobalContext";
import { FaSkull } from "react-icons/fa";

const PrivateRoute = (props) => {
  const location = useLocation();
  const spotifyContext = useContext(SpotifyContext);
  const globalContext = useContext(GlobalContext);

  const { user } = spotifyContext;
  const { setAlert } = globalContext;

  if (user) {
    return <Route {...props} />;
  } else {
    setAlert({ variant: "danger", msg: "You are not authenticated. Please log in.", icon: <FaSkull />, show: true });
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }
};

export default PrivateRoute;
