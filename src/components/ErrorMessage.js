import React, { Component } from 'react'

class ErrorMessage extends Component {
  componentWillUnmount() {
    this.props.clearErrorMsg();
  }
  render () {
    return(
    <div className="modal-view">
        <div className="modal-box text-center">
            <h2 className="text-danger">Whoops!</h2>
            <h2>:(</h2>
            <p>Something went wrong. Sorry!</p>
            <p>The Server reported:</p>
            <p className="font-weight-bold">ERROR ({this.props.errMsg.status}):</p>
            <p className="font-weight-bold">{this.props.errMsg.message}</p>
            <p>Log location: {this.props.errMsg.component}</p>
            <p className="text-sm">Please refresh the page</p>
            <button className="btn btn-info btn-sm" onClick={this.props.toggleError}>Close</button>
        </div>
    </div>
    )
  }
}

ErrorMessage.defaultProps = {
  status: 0,
  message: 'default message',
  component: 'default loc'
}


export default ErrorMessage;
