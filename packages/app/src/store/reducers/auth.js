import { LocalStorage } from 'utils';

const LS_KEY = '$_user';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const storageKey = 'details';
export const LS = LocalStorage.getInstance(LS_KEY);

function authReducer (state, { payload, type }) {
  switch (type) {
    case LOGIN: {
      LS[storageKey] = payload;
      return payload;
    }
    case LOGOUT: {
      LS[storageKey] = null;
      return null;
    }
    default:
      return state;
  }
}

export default authReducer;