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
              if(res.ok) { this.props.fetchBucketList(); } else {
                this.props.setErrorMsg(res.status,res.statusText,'BucketDetails.js:33');
                console.log(`Error (${res.status}) deleting file, server says: ${res.statusText}`);
                this.props.toggleError();
              }
            })
            .then(this.props.goHome());
            this.setState({toggleDelete: false}); // reset the delete modal window
            
  }

  // Calculate the total file size of the Bucket
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
    // get total size of bucket
    let sum = this.getSize();
    // delete buttons
    const deleteButton = <button className="btn btn-sm btn-secondary" onClick={this.toggleDel}>Delete Bucket</button>;
    const deleteConfirm = 
                        <div className="modal-view">
                          <div className="modal-box text-center">
                            <h4 className="margin-bottom">Do you really want to delete this bucket?</h4>
                            <div>
                            <button className="btn btn-danger" onClick={this.deleteBucket}>Yes!</button>
                            <button className="btn btn-info" onClick={this.toggleDel}>No!</button>
                            </div>
                          </div>
                        </div>;
    return (
      <div className="width-90 bg-white">
        <div className="text-right">
            {deleteButton}
            {(this.state.toggleDelete) ? deleteConfirm : null}
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