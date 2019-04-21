import React, { Component } from 'react';
import BucketCreate from './BucketCreate';

class Bucketlist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          toggle: false,  // toggles on/off the add bucket <form>
          select: ''
      }
  }


   // Toggle add bucket <form>
  toggleCreate = () => {
    this.setState({ toggle: !this.state.toggle });
  }

  // Select and open the bucket from the list 
  selectBucket = (e) => {
    this.props.fetchBucket(e.currentTarget.id);
    this.props.fetchObjects(e.currentTarget.id);
    this.props.toggleBucket();
  }

  render() {
    const row = this.props.buckets.map(bucket => 
                <div key={bucket.id} id={bucket.id} onClick={this.selectBucket} className={`row li ${(this.state.select===bucket.id)? 'li-active' :''}`}>
                <div className="col-9">
                {bucket.name}
                </div>
                <div className="col-3">
                  {bucket.location.name}
                </div>
              </div>);
    return (

      <>
        <BucketCreate
            /*States*/
            toggle={this.state.toggle}
            auth={this.props.auth}
            locations={this.props.locations}
            /*Functions */
            toggleCreate={this.toggleCreate}
            fetchBucketList={this.props.fetchBucketList}
            /*Error functions */
            toggleError={this.props.toggleError}
            setErrorMsg={this.props.setErrorMsg}
            />
        <div className="width-90 bg-white">
          <div className="col-3 text-left">All Buckets ({this.props.buckets.length})</div>
          <div className="row row-header">
            <div className="col-9">Name</div><div className="col-3">Location</div>
          </div>
          { row }
        </div>
      </>
    )
  }
}

React.defaultProps = {
  buckets: [
    {
      id: "-",
      name: "",
      location: {
        id: "-",
        name: ""
      }
    }
  ]
}
export default Bucketlist;