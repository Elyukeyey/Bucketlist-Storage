import React, { Component } from 'react';
import BucketFiles from './BucketFiles';
import BucketDetails from './BucketDetails';

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucket: {
                name: '',
                id: '',
                location: {
                    name: '',
                    id:''
                }
            },
            objects: [
                {
                  name: "",
                  modified: "",
                  size: 0
                }
              ],
            select:'',
            toggleTab: 'files',
        }
        this.upload = React.createRef(); // <input> je skrit, namesto <input>-a je gumb
    }
    componentDidMount() { // Ko se Component naloži dobi bucket ID
        fetch(`https://challenge.3fs.si/storage/buckets/${this.props.bucket}/objects`, 
            {
                method: "GET",
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token 728B3E93-86F6-42B2-9FED-83E3D786E318'
                        }
            })
        .then(res => res.json())
        .then(data=>this.setState({objects: data.objects}));
    }
    switchTab = (value) => {
        this.setState({toggleTab: value})
    }
    render() {        
        return (
            <>
            <div className="width-90">
            <div>
                <button className="btn btn-lg btn-primary" onClick={this.switchTab.bind(this,'files')}>Files</button>
                <button className="btn btn-lg btn-secondary" onClick={this.switchTab.bind(this,'details')}>Details</button>
            </div>
            </div>
            { this.state.toggleTab === 'files' && <BucketFiles bucket={this.props.bucket} objects={this.state.objects} goHome={this.props.goHome}/>}
            { this.state.toggleTab === 'details' && <BucketDetails bucket={this.props.bucket} objects={this.state.objects} goHome={this.props.goHome}/>}
            </>
        
        )
    }
}
export default Bucket