import { authReducer, categoriesReducer, gamesReducer, themeReducer, detailReducer } from './reducers';
import combineReducers from './combineReducers';
import { storageKey, LS } from './reducers/auth';

const defaultState = {
  loading: false,
  error: false,
  data: null,
};

export const initialState = {
  auth: LS[storageKey] ?? null,
  theme: 'light',
  games: {
    ...defaultState,
  },
  categories: {
    ...defaultState,
  },
  details: {
    ...defaultState,
    data: {},
  },
};

export default combineReducers({
  auth: authReducer,
  theme: themeReducer,
  games: gamesReducer,
  categories: categoriesReducer,
  details: detailReducer,
});
