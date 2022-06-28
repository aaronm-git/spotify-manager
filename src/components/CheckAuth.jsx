import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import SpotifyContext from "../context/spotify/spotifyContext";
import GlobalContext from "../context/GlobalContext";
import { FaSkull } from "react-icons/fa";
const CheckAuth = ({ children }) => {
  const spotifyContext = useContext(SpotifyContext);
  const globalContext = useContext(GlobalContext);
  const { user } = spotifyContext;
  const { setAlert } = globalContext;
  if (user) {
    return children;
  } else {
    setAlert({ variant: "danger", msg: "You are not authenticated. Please log in.", icon: <FaSkull />, show: true });
    return <Redirect to="/" />;
  }
};

export default CheckAuth;
