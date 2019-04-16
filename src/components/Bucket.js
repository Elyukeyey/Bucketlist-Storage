import React, { Component } from 'react';

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucket: {}, // Se shranijo vsi seznami iz API-ja
            objects: []
        }
        this.upload = React.createRef(); // <input> je skrit, namesto <input>-a je gumb
    }
    browseFiles = () => { // klik na <input> preko Ref-a
        this.upload.current.click();
    }
    uploadFile = (e) => {
        console.log(this.upload.current);
        if(e.target.value !== '') { // Če je bil izbran fajl ('' vrne če ni bil)
        console.log('value: ' + e.target.value);
        console.log('name: ' + e.target.name);
        console.log('File: ' + File);

        const formData = new FormData();
        formData.append(e.target.name,this.upload.current.files[0]);
        console.table(formData.entries());
        fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket}/objects`, 
            {
            method: "POST",
            headers: {
                Authorization: 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
                },
            body: formData
        })
        .then(res => res.json()).then(data=> console.log(data));
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
        const row = this.state.objects.map(object => 
            <div key={object.id} id={object.id} onClick={this.selectObject} className={`row li ${(this.state.select===object.id)? 'li-active' :''}`}>
            <div className="col-6">
            {object.name}
            </div>
            <div className="col-3">
            {object.modified}
            </div>
            <div className="col-3">
              {object.size}
            </div>
          </div>);
        return (
        <>
        <div className="width-90">
            <div>
                <button className="btn btn-lg btn-primary">Files</button>
                <button className="btn btn-lg btn-secondary">Details</button>
            </div>
            <div className="row">
                <div className="col-6 text-left">All files ({this.state.objects.length})</div>
                <div className="col-6 text-right">
                    <button className="btn btn-sm btn-danger">Delete Object</button>
                    <button className="btn btn-sm btn-success" onClick={this.browseFiles}>Upload Object</button>
                </div>
            </div>
            <div className="row row-header">
                <div className="col-6">Name</div><div className="col-3">Last modified</div><div className="col-3">Size</div>
            </div>
            { row }
        </div>
        <input type="file" name="file" className="hidden-input" ref={this.upload} onChange={this.uploadFile} required/>
        </>
        )
    }
}
export default Bucket