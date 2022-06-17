const SpotifyReducer = (state, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        accessToken: action.access_token,
        refreshToken: action.refreshToken,
      };

    case "GET_LIBRARY":
      return {
        ...state,
        library: action.library,
      };

    case "GET_CURRENT_USER":
      return {
        ...state,
        user: action,
      };

    default:
      return state;
  }
};

export default SpotifyReducer;
