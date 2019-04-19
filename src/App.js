import React, { Component } from 'react';
import Header from './components/Header';
import Secrets from './components/Secrets';
import Bucketlist from './components/Bucketlist';
import Bucket from './components/Bucket';

import './App.css';

const auth =  { key: '728B3E93-86F6-42B2-9FED-83E3D786E318' }

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
    selectedBucket: ''

  }


  /*  returns to the main screen
      used in Header component if the user clicks the H1 title
      used in BucketDetails component when the users deletes a bucket
  */
  goHome = () => {
    this.setState({ bucketlist: true, bucket: '' });
  }



  // toggles views between Bucket and Bucketlist components
  toggleBucket = (id) => {
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
    .then(res => res.json())
    .then(data=>this.setState({ bucket: data.bucket }))
    .catch(err => {
      console.log('fetch fail: ' + err);
      this.setState({bucket: this.state.bucket});
    });
  }

  // bucket list
  fetchBucketList = () => {
    fetch("https://challenge.3fs.si/storage/buckets",
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.state.auth/*'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'*/
            }
    })
    .then(res => res.json())
    .then(data=>this.setState({buckets: data.buckets}))
    .catch(err => {
      console.log('fetch fail: ' + err);
      this.setState({buckets: this.state.buckets});
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
    .then(res => res.json())
    .then(data=> this.setState({ locations: data.locations }))
    .catch(err => {
      console.log('fetch fail: ' + err);
      this.setState({locations: this.state.locations});
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
    .then(res => res.json())
    .then(data=>this.setState({objects: data.objects}))
    .catch(err => {
      console.log('fetch fail: ' + err);
      this.setState({objects: this.state.objects});
    });
  }

 // Login !!

  /*componentDidUpdate(prevState,prevProps) {


    if(prevState.login !== this.state.login) {
      this.fetchBucketList();
      this.fetchLocations();
    }
  }*/

//
  componentDidMount() {
    // temporary
    this.setState({ auth: auth.key });
    // temporary
  }
  // Fetch data for BucketList (main view) and BucketCreate (locations for the form) components
 /* componentDidMount() {
    this.fetchBucketList();
    this.fetchLocations();
  }*/

  render() {
    return (
      <>
        <Header goHome={this.goHome}/>
        {!this.state.login && <Secrets />}
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
