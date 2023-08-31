const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { isAuthenticated: true, token: action.payload, error: null };
      case 'LOGIN_FAILURE':
        return { isAuthenticated: false, token: null, error: action.payload };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  