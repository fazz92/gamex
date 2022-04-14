export const CATEGORIES_INIT = 'CATEGORIES_INIT';
export const CATEGORIES_DONE = 'CATEGORIES_DONE';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';

function categoriesReducer(state, { payload, type }) {
  switch (type) {
    case CATEGORIES_INIT:
      return {
        ...state,
        loading: true,
      };
    case CATEGORIES_DONE:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

export default categoriesReducer;
