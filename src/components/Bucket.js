import React, { Component } from 'react';

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucket: {}, // Se shranijo vsi seznami iz API-ja
            objects: []
        }
    }
    componentDidMount() { // Ko se Component naloži dobi bucket ID
      fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket}/objects`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
          }
      }).then(res => res.json()).then(data=>this.setState({objects: data.objects}));

    }
    render() {
        return (
        <div>
            
        </div>
        )
    }
}
export default Bucket