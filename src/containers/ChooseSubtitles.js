import { connect } from 'react-redux';
import { chooseSubtitles } from '../actions/subtitles';
import Choose from '../components/Choose';

const mapDispatchToProps = (dispatch) => ({
  onChange: (subtitle) => {
    dispatch(chooseSubtitles(subtitle.select));
  }
});

const ChooseSubtitles = connect(
  null,
  mapDispatchToProps,
)(Choose);

export default ChooseSubtitles;
