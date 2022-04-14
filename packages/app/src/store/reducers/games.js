export const GAMES_INIT = 'GAMES_INIT';
export const GAMES_DONE = 'GAMES_DONE';
export const GAMES_ERROR = 'GAMES_ERROR';

function gamesReducer(state, { payload, type }) {
  switch (type) {
    case GAMES_INIT:
      return {
        ...state,
        loading: true,
      };
    case GAMES_DONE:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case GAMES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default gamesReducer;
