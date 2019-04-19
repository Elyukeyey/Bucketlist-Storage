import React, { Component } from 'react';
import BucketFiles from './BucketFiles';
import BucketDetails from './BucketDetails';

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select:'',
            toggleTab: 'files',
        }
    }

    // switches between Files and Details tabs
    switchTab = (value) => {
        this.setState({toggleTab: value});
    }
    render() {        
        const { toggleTab } = this.state;
        return (
            <>
            <div className="width-90 bg-white">
                <div>
                    <button className={`btn btn-lg ${(toggleTab === 'files') ? 'btn-primary' : 'btn-secondary' }`} onClick={this.switchTab.bind(this,'files')}>Files</button>
                    <button className={`btn btn-lg ${(toggleTab === 'details') ? 'btn-primary' : 'btn-secondary'}`} onClick={this.switchTab.bind(this,'details')}>Details</button>
                </div>
            </div>
            { this.state.toggleTab === 'files' && <BucketFiles 
                                                        bucket={this.props.bucket}
                                                        objects={this.props.objects}
                                                        auth={this.props.auth}
                                                        fetchObjects={this.props.fetchObjects}
                                                        goHome={this.props.goHome}/>}
            { this.state.toggleTab === 'details' && <BucketDetails
                                                        bucket={this.props.bucket}
                                                        objects={this.props.objects}
                                                        auth={this.props.auth}
                                                        goHome={this.props.goHome}
                                                        fetchBucketList={this.props.fetchBucketList}/>}
            </>
        
        )
    }
}

React.defaultProps = {
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
      ]
}

export default Bucket