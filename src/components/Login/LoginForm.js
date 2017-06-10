import React from 'react';
import { Message, Button, Input } from 'semantic-ui-react';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submit(event) {
    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Message info>
          <Message.Header>Login to your OpenSubtitles Account</Message.Header>
          <p>You need to have already a OpenSubtitles account. Connect with your logins of OpenSubtitles.org.</p>
        </Message>
        <form className="ui form" onSubmit={this.submit}>
          <div className="field">
            <label>Email Address</label>
            <Input name='email' value={this.state.email} onChange={this.handleInputChange} placeholder="usuario@dominio.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <Input name='password' type='password' value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
          </div>
          <Button content='Login' />
        </form>
      </div>
    )
  }
}

export default LoginForm;
