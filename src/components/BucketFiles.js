import React, { Component } from 'react'

class BucketFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            toggleDelete: '',
            postErrData: {}
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
            if(res.status === 201) {
                this.props.fetchObjects(id);
            } else {
                console.log(res);
            }
        })
        .catch(r=>r.json());
        }
    }

    // DELETE functions

    // select file to delete
    selectObject = (e) => { 
        e.preventDefault();
        this.setState({ select: e.currentTarget.id });
    }

    // toggles the "confirm/cancel" buttons or the "delete" button
    toggleDel = () => {
        this.setState({toggleDelete: !this.state.toggleDelete});
    } 


    // DELETE request
    deleteObject = () => { // sends the delete request to API
        if(this.state.select !== '') {
            fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket.id}/objects/${this.state.select}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.props.auth
                }
            })
            .then(res => {
                if(res.status === 200) { // if response OK, update the state with new data
                  this.props.fetchObjects(this.props.bucket.id)
                } else {
                    console.log(res);
                }
            })
            this.setState({select: '', toggleDelete: false}); // reset the selection and delete button

        } else {
            alert('Select an object to delete!'); // if object is not selected alert the user
        }
    }

    // Only to test the component props
    /*componentDidUpdate(prevProps,prevState) {
        if(this.props.buckets !== prevProps.buckets) {
          console.log('BL component updated ...:');
          console.log('this.props:');
          console.table(this.props.buckets);
          console.log('prevProps:')
          console.table(prevProps.buckets);
        }
      }*/
  render() {
    // Object iteration
    const row = this.props.objects.map(object =>
        <div key={object.name} id={object.name} onClick={this.selectObject} className={`row li ${(this.state.select===object.name)? 'li-active' :''}`}>
        <div className="col-5">
        <i className="far fa-file-alt"></i> {object.name}
        </div>
        <div className="col-4">
        {object.last_modified
        }
        </div>
        <div className="col-3">
          {((object.size/1024/1024) < 1) ? Math.round(object.size/1024) + 'kB' : Math.round(object.size/1024/1024) + 'MB'}
        </div>
      </div>);
    // Delete buttons
    const deleteButton = <button className="btn btn-sm btn-secondary" onClick={this.toggleDel}>Delete Object</button>;
    const deleteConfirm = 
    <>
    Do you really want to delete this object?
    <button className="btn btn-sm btn-danger" onClick={this.deleteObject}>Confirm</button>
    <button className="btn btn-sm btn-info" onClick={this.toggleDel}>Cancel</button>
    </>;
    return (
        <>
        <div className="width-90 bg-white">
            <div className="row">
                <div className="col-3 text-left">All files ({this.props.objects.length})</div>
                <div className="col-9 text-right">
                {(this.state.toggleDelete) ? deleteConfirm : deleteButton }
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