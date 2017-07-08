import { connect } from 'react-redux';
import { chooseSubtitles } from '../actions/subtitles';
import Choose from '../components/Choose';

const mapStateToProps = (state) => ({
  options: [{key: '', value: ''}, { key: 'af', value: 'af', text: 'Afghanistan' }, ...{}],
  placeholder: 'Select your subtitles',
  confirmText: 'Choose',
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (subtitle) => {
    dispatch(chooseSubtitles(subtitle.select));
  }
});

const ChooseSubtitles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Choose);

export default ChooseSubtitles;
