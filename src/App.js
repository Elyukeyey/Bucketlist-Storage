import React, { Component } from 'react';
import Header from './components/Header';
import Bucketlist from './components/Bucketlist';
import Bucket from './components/Bucket';

import './App.css';

class App extends Component {

  state = {
    bucketlist: true,
    bucket: ''

  }
  goHome = () => {
    this.setState({ bucketlist: true, bucket: '' });
  }
  changeView = () => {
    this.setState({ bucktetlist: !this.state.bucketlist});
  }
  getBucketId = (id) => {
    this.setState({bucket: id});
    this.setState({bucketlist: false});
  }
  render() {
    return (
      <>
        <Header goHome={this.goHome}/>
        <h2>{(this.state.bucket === '') ? 'Bucket list' : this.state.bucket }</h2>
        {this.state.bucketlist && <Bucketlist changeView={this.changeView} getBucketId={this.getBucketId}/>}
        {!this.state.bucketlist && <Bucket bucket={this.state.bucket} goHome={this.goHome}/>}
      </>
    );
  }
}

export default App;
