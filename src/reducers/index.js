import { combineReducers } from 'redux';
import login from './login';
import subtitles from './subtitles';

const netflixSubsApp = combineReducers({
  login,
  subtitles,
});

export default netflixSubsApp;
