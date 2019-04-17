import React, { Component } from 'react';
import BucketCreate from './BucketCreate';

class Bucketlist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          buckets: [
            {
              id: "1",
              name: "2",
              location: {
                id: "1",
                name: "2"
              }
            }
          ], // Se shranijo vsi seznami iz API-ja
          toggle: false,  // Vklopi izklopi Dodaj Bucket
          select: ''
      }
  }

  appendBucket = (e) => { // Doda na lokalni seznam 
    this.setState({ buckets: [...this.state.buckets, e]})
  }
  componentDidMount() { // Ko se Component naloži pokaži vse buckete
    fetch("https://challenge.3fs.si/storage/buckets", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
      }
  }).then(res => res.json()).then(data=>this.setState({buckets: data.buckets}));
}
  toggleCreate = () => { // Vklopi / izklopi FORM za dodat nove Buckete
    this.setState({ toggle: !this.state.toggle });
  }
  selectBucket = (e) => {
    e.preventDefault();
    this.props.getBucketId(e.currentTarget.id);
    //this.setState({ select: e.currentTarget.id });
  }
  render() {
    const row = this.state.buckets.map(bucket => 
                <div key={bucket.id} id={bucket.id} onClick={this.selectBucket} className={`row li ${(this.state.select===bucket.id)? 'li-active' :''}`}>
                <div className="col-9">
                {bucket.name}
                </div>
                <div className="col-3">
                  {bucket.location.name}
                </div>
              </div>);
    return (

      <>
        <BucketCreate changeView={this.props.changeView} toggle={this.state.toggle} toggleCreate={this.toggleCreate} appendBucket={this.appendBucket}/>
        <div className="width-90">
        <div className="row row-header">
          <div className="col-9">Name</div><div className="col-3">Location</div>
        </div>
            { (this.state.buckets) ? row : '' }
        </div>
      </>
    )
  }
}
export default Bucketlist;