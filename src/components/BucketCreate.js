import React, { Component } from 'react';

class BucketCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            newBucket: {
                name: '',
                location: ''
                }
            }
        }
    componentDidMount() {
        fetch("https://challenge.3fs.si/storage/locations", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318' // Za tole ne vem kam se skrije process.env ne dela?
            }
        }).then(res => res.json()).then(data=> this.setState({ locations: data.locations }));
    }
    // Vneseno ime - so kakšne omejitve glede tega??
    handleNameChange = (e) => {
        const newState = {
            name: e.target.value,
            location: this.state.newBucket.location
        }
        this.setState({ newBucket: newState });
    }
    // Spreminja vrednost glede na SELECT
    handleSelectChange = (e) => {
        let newState = {
            name: this.state.newBucket.name,
            location: e.target.value
        }
        this.setState({ newBucket: newState })
    }
    // Dodajanje bucketa -> POST API
    addBucket = (e) => {
        e.preventDefault();
        
        fetch("https://challenge.3fs.si/storage/buckets", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
                },
            body: JSON.stringify({
                name: this.state.newBucket.name,
                location: (this.state.newBucket.location === '') ? '541909F3-20FC-4382-A8E8-18042F5E7677' : this.state.newBucket.location
            })
        })
        .then(res => res.json()).then(data=> this.props.appendBucket(data));
        this.props.toggleCreate();
    }
  render() {
    // FORM za dodajanje bucketov
    const form = <form onSubmit={this.addBucket}>
                    <div className="row">
                        <div className="col-6">
                        <label>Bucket Name*</label><br />
                        <input type="text" name="name" value={this.state.newBucket.name} onChange={this.handleNameChange}/>      
                        </div>
                        <div className="col-6">
                        <label>Location*</label><br />
                            <select name="locations" onChange={this.handleSelectChange}>
                                {this.state.locations.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <button className="btn btn-success">Add Bucket</button>
                        </div>
                    </div>
                </form>;
    // Gumb za toggle FORM
    const btn = <button onClick={this.props.toggleCreate} className="btn btn-info">CreateBucket</button>
    return (
    <>
        <div className="width-90">
        {(this.props.toggle) ? form : btn}
        </div>
    </>
    )
  }
}

export default BucketCreate
