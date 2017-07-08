import { connect } from 'react-redux';
import { downloadSubtitle } from '../actions/subtitles';
import DownloadButton from '../components/DownloadButton';

const mapStateToProps = (state) => ({
  content: 'Download subtitles',
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    dispatch(downloadSubtitle());
  }
});

const DownloadSubtitles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownloadButton);

export default DownloadSubtitles;
