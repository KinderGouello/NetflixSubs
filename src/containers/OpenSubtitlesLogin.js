import { connect } from 'react-redux';
import { login } from '../actions/login';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => ({
  errorMessage: state.login.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (credentials) => {
    dispatch(login(credentials));
  }
});

const OpenSubtitlesLogin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default OpenSubtitlesLogin;
