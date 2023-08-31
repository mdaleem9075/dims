import axios from 'axios';

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      if (response.data.token) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Something went wrong' });
    }
  };
};

export const logout = () => {
  return { type: 'LOGOUT' };
};
