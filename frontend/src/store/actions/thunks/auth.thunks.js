/* eslint-disable no-undef */
import axios from 'axios';
import { logOut, setAuthToken } from '../auth-token.actions';

export const loginThunk = (email, password) => async (dispatch) => {
  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/login/',
    data: {
      email,
      password,
    },
  }).then((response) => {
    const payload = response.data.token;
    localStorage.setItem('AUTH_TOKEN', payload);
    dispatch(setAuthToken(payload));
  });
};

export const logoutThunk = () => (dispatch) => {
  localStorage.removeItem('AUTH_TOKEN');
  dispatch(logOut());
};
