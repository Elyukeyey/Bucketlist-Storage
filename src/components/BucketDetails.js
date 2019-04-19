import React, { Component } from 'react'

class BucketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleDelete: false,
            select: ''
        }
    }


    // Delete Bucket functions


    // toggle delete bucket / confirm buttons
    toggleDel = () => {
       this.setState({toggleDelete: !this.state.toggleDelete});
    }


   // send delete request to API
  deleteBucket = () => {
            fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket.id}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.props.auth
                }
            })
            .then((res) => {
              if (res.status === 200) {
                this.props.fetchBucketList();
              } else {
                console.log(res);
              }
            })
            .then(this.setState({toggleDelete: false}))
            .then(this.props.goHome());
  }

  // Calculate the total size of the Bucket
  getSize = () => {
    let sum = 0;
    if (this.props.objects) {
      this.props.objects.forEach((val) => sum += val.size);
    }
    if ((sum/1024/1024) < 1) { // return kB or MB values respectively
        return Math.round(sum/1024) + 'kB';
     } else {
        return Math.round(sum/1024/1024) + 'MB';
     } 
  }
  render() {
    const { name, location } = this.props.bucket;
    let sum = this.getSize();
    const deleteButton = <button className="btn btn-sm btn-secondary" onClick={this.toggleDel}>Delete Object</button>;
    const deleteConfirm = 
                        <>
                            Do you really want to delete this bucket? 
                            <button className="btn btn-sm btn-danger" onClick={this.deleteBucket}>Confirm</button>
                            <button className="btn btn-sm btn-info" onClick={this.toggleDel}>Cancel</button>
                            </>;
    return (
      <div className="width-90 bg-white">
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
                <p>{ sum }</p>
            </div>
        </div>
      </div>
    )
  }
}
export default BucketDetails;