import React, { Component } from 'react'

class Bucketlist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          buckets: [
            {
              "id": "my-awesome-bucket",
              "name": "my-awesome-bucket",
              "location": {
                "id": "a0c51094-05d9-465f-8745-6cd9ee45b96d",
                "name": "Kranj"
              }
            }
          ], // Se shranijo vsi seznami iz API-ja
          toggleCreate: false  // Vklopi izklopi Dodaj Bucket
      }
  }
  componentDidMount() { // Ko se Component naloži pokaži vse buckete
    /*fetch("https://challenge.3fs.si/storage/buckets", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.props.token
        }
    }).then(res => res.json()).then(data=>this.setState({buckets: data}));*/
  }
  render() {
    const row = this.state.buckets.map(bucket => 
              <li key={bucket.name} className="row">
                <div className="col-8">
                {bucket.name}
                </div>
                <div className="col-4">
                  {bucket.location.name}
                </div>
              </li>);
    return (
      <div className="width-90">
      <ul>
        { row }
      </ul>
      </div>
    )
  }
}
export default Bucketlist;