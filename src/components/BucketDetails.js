import React, { Component } from 'react'

class BucketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleBucket:  {
                id: "",
                name: "",
                location: {
                  id: "",
                  name: ""
                }
              },
            toggleDelete: false
        }
    }
    componentDidMount() { // Ko se Component naloži dobi bucket ID
        fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
            }
        })
        .then(res => res.json())
        .then(data=>this.setState({ singleBucket: data.bucket }));
    }
    toggleDel = () => {
       this.setState({toggleDelete: !this.state.toggleDelete});
    }
    deleteBucket = () => {
        if(this.state.select !== '') {
            console.log('deleted bucket ' + this.state.singleBucket.id);
            fetch(`https://challenge.3fs.si/storage/buckets/${this.state.singleBucket.id}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
                }
            })
            this.setState({select: '', toggleDelete: false});
            this.props.goHome();
            // napiši change state v App.js zato da vrne na prvo stran ko se izbriše + alert...
        }
    }
  render() {
    const { name, location } = this.state.singleBucket;
    let sum = 0;
    this.props.objects.forEach((val) => sum += val.size);
    const deleteButton = <button className="btn btn-sm btn-secondary" onClick={this.toggleDel}>Delete Object</button>;
    const deleteConfirm = 
                        <>
                            Do you really want to delete this bucket? 
                            <button className="btn btn-sm btn-danger" onClick={this.deleteBucket}>Confirm</button>
                            <button className="btn btn-sm btn-info" onClick={this.toggleDel}>Cancel</button>
                            </>;
    return (
      <div className="width-90">
        <div className="text-right">
            {(this.state.toggleDelete) ? deleteConfirm : deleteButton }
        </div>
        <div className="row">
            <div className="col-3">
                <p>Bucket name:</p>
                <p>Location:</p>
                <p>Storage size:</p>
            </div>
            <div className="col-9">
                <p>{name}</p>
                <p>{location.name}</p>
                <p>{((sum/1024/1024) < 1) ? Math.round(sum/1024) + 'kB' : Math.round(sum/1024/1024) + 'MB'}</p>
            </div>
        </div>
      </div>
    )
  }
}
export default BucketDetails;