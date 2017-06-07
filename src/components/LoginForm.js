import React from 'react';
import { Button, Input, Label } from 'semantic-ui-react';

class LoginForm extends React.Component {
  render() {
    return (
      <form>
        <p>Login</p>
        <div>
          <label>Email Address</label>
          <Input placeholder="usuario@dominio.com" />
        </div>
        <div>
          <label>Password</label>
          <Input placeholder="Password" />
        </div>
        <Button>Login</Button>
      </form>
    )
  }
}

export default LoginForm;
