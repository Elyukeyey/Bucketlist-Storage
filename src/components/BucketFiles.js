import React, { Component } from 'react'

class BucketFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: '',
            toggleDelete: '',
        }
        this.upload = React.createRef(); // <input> je skrit, namesto <input>-a je gumb
    }
    // UPLOAD funkcije
    browseFiles = () => { // klik na <input> preko Ref-a
        this.upload.current.click();
    }
    uploadFile = (e) => { // NUJNO ŠE REFRESH - DA GA PRIKAŽE NA NOVO!
        console.log(this.upload.current);
        if(e.target.value !== '') { // Če je bil izbran fajl ('' vrne če ni bil) 
        console.log('value: ' + e.target.value);
        console.log('name: ' + e.target.name);
        console.log('File: ' + File);

        const formData = new FormData();
        formData.append(e.target.name,this.upload.current.files[0]);
        fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket}/objects`, 
            {
            method: "POST",
            headers: {
                Authorization: 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
                },
            body: formData
        })
        .then(res => res.json()).then(data=> console.log(data)).catch(r=>r.json());
        }
    }

    // DELETE funkcije
    selectObject = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id)
        this.setState({ select: e.currentTarget.id });
    }
    toggleDel = () => {
        this.setState({toggleDelete: !this.state.toggleDelete});
    } 
    deleteObject = () => {
        if(this.state.select !== '') {
            fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket}/objects/${this.state.select}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
                }
            })
            .then(res => res.json())
            .then(data=>console.log(data));
            this.setState({select: '', toggleDelete: false});
            // napiši state change, da se ga odstrani s seznama.

        } else {
            alert('Select an object to delete!');
        }
    }
  render() {
    const row = this.props.objects.map(object =>
        <div key={object.name} id={object.name} onClick={this.selectObject} className={`row li ${(this.state.select===object.name)? 'li-active' :''}`}>
        <div className="col-5">
        {object.name}
        </div>
        <div className="col-4">
        {object.last_modified
        }
        </div>
        <div className="col-3">
          {((object.size/1024/1024) < 1) ? Math.round(object.size/1024) + 'kB' : Math.round(object.size/1024/1024) + 'MB'}
        </div>
      </div>);
    const deleteButton = <button className="btn btn-sm btn-secondary" onClick={this.toggleDel}>Delete Object</button>;
    const deleteConfirm = 
    <>
    Do you really want to delete this object?
    <button className="btn btn-sm btn-danger" onClick={this.deleteObject}>Confirm</button>
    <button className="btn btn-sm btn-info" onClick={this.toggleDel}>Cancel</button>
    </>;
    return (
        <>
        <div className="width-90">
            <div className="row">
                <div className="col-6 text-left">All files ({this.props.objects.length})</div>
                <div className="col-6 text-right">
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
BucketFiles.defaultProps = {
    objects: [
        {
          name: "",
          modified: "",
          size: 0
        }
      ]       
}

export default BucketFiles;