import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Header from './Header/Header';
import OpenSubtitlesLogin from '../containers/OpenSubtitlesLogin';
import ChooseSubtitles from '../containers/ChooseSubtitles';
import DownloadSubtitles from '../containers/DownloadSubtitles';

class App extends React.Component {
  componentDidMount() {
    /* eslint-disable no-undef */
    // if (chrome.tabs !== undefined) {
    //   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    //     var tab = tabs[0];
    //     console.log(tab.url, tab.title);
    //     chrome.tabs.getSelected(null, function(tab) {
    //       chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(msg) {
    //         msg = msg || {};
    //         console.log('onResponse', msg.farewell);
    //       });
    //     });
        // Send a request to the content script.
        // chrome.runtime.sendMessage(null, {action: 'getDOM'}, {}, (response) => {
        //   console.log(response);
        // });
      // });
    // }
    /* eslint-enable no-undef */
  }

  render() {
    return (
      <div>
        <Header />
          <Router>
            <div style={{paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px',}}>
              <Route exact path="/" component={OpenSubtitlesLogin}/>
              <Route path="/choice" component={ChooseSubtitles} />
              <Route path="/download" component={DownloadSubtitles} />
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
