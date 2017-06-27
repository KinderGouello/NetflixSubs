import { combineReducers } from 'redux';
import login from './login';

const netflixSubsApp = combineReducers({
  login,
});

export default netflixSubsApp;
