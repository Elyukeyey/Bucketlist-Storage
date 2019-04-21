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
                    <button className={`btn btn-lg ${(toggleTab === 'files') ? 'btn-info' : 'btn-secondary' }`} onClick={this.switchTab.bind(this,'files')}>Files</button>
                    <button className={`btn btn-lg ${(toggleTab === 'details') ? 'btn-info' : 'btn-secondary'}`} onClick={this.switchTab.bind(this,'details')}>Details</button>
                </div>
            </div>
            { this.state.toggleTab === 'files' && <BucketFiles 
                                                        /*States */
                                                        bucket={this.props.bucket}
                                                        objects={this.props.objects}
                                                        auth={this.props.auth}
                                                        /*Functions */
                                                        fetchObjects={this.props.fetchObjects}
                                                        goHome={this.props.goHome}
                                                        /* Error Functions */
                                                        toggleError={this.props.toggleError}
                                                        setErrorMsg={this.props.setErrorMsg}
                                                        />}
            { this.state.toggleTab === 'details' && <BucketDetails
                                                        /* States */
                                                        bucket={this.props.bucket}
                                                        objects={this.props.objects}
                                                        auth={this.props.auth}
                                                        /* Functions */
                                                        goHome={this.props.goHome}
                                                        fetchBucketList={this.props.fetchBucketList}
                                                        /* Error Functions */
                                                        toggleError={this.props.toggleError}
                                                        setErrorMsg={this.props.setErrorMsg}
                                                        />}
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