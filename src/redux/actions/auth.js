import * as authAPI from 'aliasAPI/rtk-auth';
import {
  SIGN_IN,
  LOG_OUT
} from 'aliasConstants';

const setUser = (payload) => ({
  type: SIGN_IN,
  payload
});

const logOut = (payload) => ({
  type: LOG_OUT,
  payload
});

export function auth(user) {
  return async (dispatch) => {
    try {
      // const response = await authAPI.sendUser(user);
      const response = await authAPI.authUser(user);
      dispatch(setUser(response.data.responseCode));
    } catch (error) {
      console.info('Action: sendUser error', error.message || error);
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      // const response = await authAPI.sendUser(user);
      const response = await authAPI.Logout();
      console.log('logoutUser', response);
      dispatch(logOut(response.data.responseCode));
    } catch (error) {
      console.info('Action: sendUser error', error.message || error);
    }
  }
}