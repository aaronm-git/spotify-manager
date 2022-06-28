import React, { useEffect, useContext } from "react";
import { useQuery } from "../utils";
import { Redirect, useHistory } from "react-router-dom";
import SpotifyContext from "../context/spotify/spotifyContext";
import GlobalContext from "../context/GlobalContext";

import Loading from "../components/layout/Loading";

const Callback = () => {
  const history = useHistory();
  const search = useQuery();
  const spotifyCode = search.get("code");
  const spotifyContext = useContext(SpotifyContext);
  const globalContext = useContext(GlobalContext);

  const { loading } = globalContext;

  useEffect(() => {
    if (spotifyCode) {
      spotifyContext.getAccessToken(spotifyCode);
    } else {
      history.push("/");
    }
  }, []);

  return !loading && spotifyContext.user ? <Redirect to="/dashboard" /> : <Loading />;
};

export default Callback;
