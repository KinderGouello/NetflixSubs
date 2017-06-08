import React from 'react';
import { Button, Input } from 'semantic-ui-react';

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
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.submit}>
        <p>OpenSubtitles Login</p>
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
    )
  }
}

export default LoginForm;
