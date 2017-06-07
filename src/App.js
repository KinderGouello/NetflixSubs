import React from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <LoginForm />
      </div>
    );
  }
}

export default App;
