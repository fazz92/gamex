export const GAME_DETAIL_INIT = 'GAME_DETAIL_INIT';
export const GAME_DETAIL_DONE = 'GAME_DETAIL_DONE';
export const GAME_DETAIL_ERROR = 'GAME_DETAIL_ERROR';

function gamesReducer(state, { payload, type }) {
  switch (type) {
    case GAME_DETAIL_INIT:
      return {
        ...state,
        loading: true,
      };
    case GAME_DETAIL_DONE:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...payload,
        }
      };
    case GAME_DETAIL_ERROR:
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
