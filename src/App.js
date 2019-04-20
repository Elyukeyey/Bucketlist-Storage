import React, { Component } from 'react';
import Header from './components/Header';
import Secrets from './components/Secrets';
import Bucketlist from './components/Bucketlist';
import Bucket from './components/Bucket';

import './App.css';

class App extends Component {

    state = {
    login: false,
    auth: 'Token',
    bucket: {
      name: '',
      id: '',
      location: {
          name: '',
          id:''
      }
    },
    buckets: [
            {
              id: "-",
              name: "",
              location: {
                id: "-",
                name: ""
              }
            }
          ],
    locations: [],
    objects: [
      {
        name: "",
        modified: "",
        size: 0
      }
    ],
    bucketlist: true,
  }

  // Login functions

  handleLogin = (val) => {
    this.setState({
      auth: 'Token ' + val,
    });
  }

  toggleLogin = () => {
    this.setState({login: true});
  }

  /*  returns to the main screen
      used in Header component if the user clicks the H1 title
      used in BucketDetails component when the users deletes a bucket
  */
  goHome = () => {
    let emptyBucket = {
      name: '',
      id: '',
      location: {
          name: '',
          id:''
      }
    }
    this.setState({ bucketlist: true, bucket: emptyBucket });
  }



  // toggles views between Bucket and Bucketlist components
  toggleBucket = () => {
    this.setState({bucketlist: false});
  }




  // GET REQUESTS:

  // single bucket
  fetchBucket = (id) => {
    fetch(`https://challenge.3fs.si/storage/buckets/${id}`, 
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.state.auth
          }
          })
    .then(res => {
      (res.ok) ? res.json().then(data=>this.setState({ bucket: data.bucket })) : console.log(`Error (${res.status}) on fetch Bucket, server response: ${res.statusText}`);
    });
  }

  // bucket list
  fetchBucketList = () => {
    fetch("https://challenge.3fs.si/storage/buckets",
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.state.auth
            }
    })
    .then(res => {
      (res.ok) ? res.json().then(data=>this.setState({ buckets: data.buckets })) : console.log(`Error (${res.status}) on fetch BucketList, server response: ${res.statusText}`);
    });

  }

  // fetch Locations
  fetchLocations = () => {
    fetch("https://challenge.3fs.si/storage/locations",
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.state.auth
    }})
    .then(res =>{
      (res.ok) ? res.json().then(data=> this.setState({ locations: data.locations })) : console.log(`Error (${res.status}) on fetch Locations, server response: ${res.statusText}`);
    });
  }


  // fetch object lists
  fetchObjects = (id) => {
    fetch(`https://challenge.3fs.si/storage/buckets/${id}/objects`, 
          {
              method: "GET",
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': this.state.auth
                      }
          })
    .then(res => {
      (res.ok) ? res.json().then(data=>this.setState({ objects: data.objects })) : console.log(`Error (${res.status}) on fetch Objects, server response: ${res.statusText}`);
    });    
  }

 // Mounting and Updating:

 /*
        I used getSnapshotBeforeUpdate because the prevState in componentDidUpdate returned and empty object ({ })
        which set off an infinite loop of state updates.

 */
  getSnapshotBeforeUpdate(prevProps,prevState) { // prevState returns correctly
      if(prevState !== null) {
        return prevState.auth;
      }
      return null;
  }

  componentDidUpdate(prevState,prevProps,snapshot) { // prevState returns an empty object, that's why snapshot is used
    if (snapshot !== null && snapshot !== this.state.auth) {

      this.fetchBucketList();
      this.fetchLocations();
      this.toggleLogin();
    }
  }

  // Check if user already logged in
  componentDidMount() {
    let ls = localStorage.getItem('userKey');
    if (ls !== null) {
      this.setState({ auth: ls});
      } 
  }



  render() {
    return (
      <>
        <Header goHome={this.goHome}/>
        {!this.state.login && <Secrets
                                    handleLogin={this.handleLogin}
                                    fetchBucketList={this.fetchBucketList}
                                    fetchLocations={this.fetchLocations}/>}
        <div className="width-90"><h2>{(!this.state.bucket) ? 'Bucket list' : this.state.bucket.name }</h2></div>
        {(this.state.login && this.state.bucketlist) && <Bucketlist 
                                    buckets={this.state.buckets}
                                    locations={this.state.locations}
                                    auth={this.state.auth}
                                    toggleBucket={this.toggleBucket}
                                    fetchBucketList={this.fetchBucketList}
                                    fetchObjects={this.fetchObjects}
                                    fetchBucket={this.fetchBucket}
                                    />}
        {(this.state.login && !this.state.bucketlist) && <Bucket 
                                    bucket={this.state.bucket}
                                    objects={this.state.objects}
                                    auth={this.state.auth}
                                    goHome={this.goHome}
                                    fetchObjects={this.fetchObjects}
                                    fetchBucketList={this.fetchBucketList}
                                    />}
      </>
    );
  }
}

export default App;
