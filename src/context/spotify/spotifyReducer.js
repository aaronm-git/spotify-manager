const SpotifyReducer = (state, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in,
        token_updated: new Date(),
      };

    case "GET_TOKEN_GET_USER":
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in,
        token_updated: new Date(),
        user: action.payload.user,
      };

    case "REFRESH_TOKEN":
      return {
        ...state,
        access_token: action.payload.access_token,
        expires_in: action.payload.expires_in,
        token_updated: new Date(),
      };

    case "GET_LIBRARY":
      return {
        ...state,
        savedTracks: action.payload,
      };

    case "GET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default SpotifyReducer;
