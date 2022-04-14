export const THEME_CHANGE = 'THEME_CHANGE';

function themeReducer(state, { payload, type }) {
  switch (type) {
    case THEME_CHANGE:
      return payload;
    default:
      return state;
  }
}

export default themeReducer;
