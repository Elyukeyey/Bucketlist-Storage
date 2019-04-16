import React, { Component } from 'react';
import Header from './components/Header';
import Bucketlist from './components/Bucketlist';

import './App.css';

class App extends Component {
  state = {
    token: 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
  }
  render() {
    return (
      <>
        <Header />
        <Bucketlist token={this.state.token}/>
      </>
    );
  }
}

export default App;
