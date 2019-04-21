import React, { Component } from 'react'

class BucketFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            toggleDelete: false,
        }
        // Ref for the hidden <input> - input activates when the button is pressed.
        this.upload = React.createRef(); 
    }



    // UPLOAD functions

    // trigger the <input> for file upload
    browseFiles = () => {
        this.upload.current.click();
    }

    // Send the file to the API
    uploadFile = (e) => {
        if(e.target.value !== '') { // Check if a file was selected 
        let {id} = this.props.bucket;
        const formData = new FormData();
        formData.append(e.target.name,this.upload.current.files[0]);
        fetch(`https://challenge.3fs.si/storage/buckets/${id}/objects`, 
            {
            method: "POST",
            headers: {
                Authorization: this.props.auth
                },
            body: formData
        })
        .then(res => {
            if (res.ok) { this.props.fetchObjects(id); } else {
                this.props.setErrorMsg(res.status,res.statusText,'BucketFiles.js:39');
                console.log(`Error (${res.status}) uploading file, server says: ${res.statusText}`); 
                this.props.toggleError();
            }
        });
        }
    }

    // DELETE functions

    // Select file to delete
    selectObject = (e) => { 
        e.preventDefault();
        this.setState({ select: e.currentTarget.id });
    }

    // toggles the "confirm/cancel" modal window
    // alerts the user if no file is selected
    toggleDel = () => {
        (this.state.select) ? this.setState({toggleDelete: !this.state.toggleDelete}) : alert('Select a file to delete!');
    } 


    // Delete single files from Bucket
    deleteObject = () => { // sends the delete request to API
            fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket.id}/objects/${this.state.select}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.props.auth
                }
            })
            .then(res => {
                if (res.ok) { this.props.fetchObjects(this.props.bucket.id) } else { 
                    this.props.setErrorMsg(res.status,res.statusText,'BucketFiles.js:73');
                    console.log(`Error (${res.status}) deleting file, server says: ${res.statusText}`);
                    this.props.toggleError();
                }
            });
            //.catch(res=>res.json().then(data=>console.table(data)));
            this.setState({select: '', toggleDelete: false}); // reset the selection and delete button
  }

  render() {
    // Render files
    const row = this.props.objects.map(object =>
        <div key={object.name} id={object.name} onClick={this.selectObject} className={`row li ${(this.state.select===object.name)? 'li-active' :''}`}>
        <div className="col-5">
        <i className="far fa-file-alt"></i> {object.name}
        </div>
        <div className="col-4">
        {object.last_modified}
        </div>
        <div className="col-3">
          {((object.size/1024/1024) < 1) ? Math.round(object.size/1024) + 'kB' : Math.round(object.size/1024/1024) + 'MB'}
        </div>
      </div>
        );
    // Delete buttons
    const deleteButton = <button className="btn btn-sm btn-secondary" onClick={this.toggleDel}>Delete Object</button>;
    const deleteConfirm = 
    <div className="modal-view">
        <div className="modal-box text-center">
            <h4 className="margin-bottom">Do you really want to delete this file?</h4>
                <div>
                    <button className="btn btn-sm btn-danger" onClick={this.deleteObject}>Confirm</button>
                    <button className="btn btn-sm btn-info" onClick={this.toggleDel}>Cancel</button>
                </div>
        </div>
    </div>;
    return (
        <>
        <div className="width-90 bg-white">
            <div className="row">
                <div className="col-3 text-left">All files ({this.props.objects.length})</div>
                <div className="col-9 text-right">
                {deleteButton}
                {(this.state.toggleDelete) ? deleteConfirm : null}
                    <button className="btn btn-sm btn-success" onClick={this.browseFiles}>Upload Object</button>
                </div>
            </div>
            <div className="row row-header">
                <div className="col-5">Name</div><div className="col-4">Last modified</div><div className="col-3">Size</div>
            </div>
            { (this.props.objects) ? row : `Something's wrong...` }
        </div>
        <input type="file" name="file" className="hidden-input" ref={this.upload} onChange={this.uploadFile} required/>
            </>
    )
  }
}

React.defaultProps = {
    objects: [
        {
          name: "",
          modified: "",
          size: 0
        }
      ]
}

export default BucketFiles;