import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Button, Input } from 'semantic-ui-react';

class LoginForm extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.onSubmit({
      email: email.inputRef.value.trim(),
      password: password.inputRef.value,
    });
    this.refs.password.inputRef.value = '';
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div>
        {!!errorMessage &&
          <Message error>
            <Message.Header>Error during logging</Message.Header>
            <p>{errorMessage}</p>
          </Message>
        }

        <form className="ui form" onSubmit={(event) => { this.handleSubmit(event) }}>
          <Message info>
            <Message.Header>Login to your OpenSubtitles Account</Message.Header>
            <p>You need to have already a OpenSubtitles account. Connect with your logins of OpenSubtitles.org.</p>
          </Message>
          <div className="field">
            <label>Email Address</label>
            <Input name="email" ref="email" placeholder="usuario@dominio.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <Input name="password" type="password" ref="password" placeholder="Password" />
          </div>
          <Button content='Login' />
        </form>
      </div>
    );
  }
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default LoginForm;
