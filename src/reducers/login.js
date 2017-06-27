import { LOGIN_SUCCESS } from '../actions/login';

const login = (state = {
  connected: false,
  errorMessage: '',
}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        connected: true,
        token_id: action.token_id,
      };

    default:
      return state;
  }
};

export default login;
