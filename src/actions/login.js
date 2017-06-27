export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    connected: true,
    token_id: 'dsfsfdsfsdzjeroijezisodf',
  };
}

export function login(credentials) {
  return dispatch => {
    // call to api for jwt
    // ...
    dispatch(loginSuccess());
  };
}
