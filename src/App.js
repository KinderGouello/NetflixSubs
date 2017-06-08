import React from 'react';
import Header from './components/Header/Header';
// import LoginForm from './components/Login/LoginForm';
import DownloadButton from './components/Download/DownloadButton';
import ChooseForm from './components/Choose/ChooseForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px',}}>
          <ChooseForm />
        </div>
      </div>
    );
  }
}

export default App;
