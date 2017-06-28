import { CHOOSE_SUBTITLES } from '../actions/subtitles';

const subtitles = (state = { subtitle: '' }, action) => {
  switch (action.type) {
    case CHOOSE_SUBTITLES:
      return {
        ...state,
        subtitle: action.subtitle,
      };

    default:
      return state;
  }
};

export default subtitles;
