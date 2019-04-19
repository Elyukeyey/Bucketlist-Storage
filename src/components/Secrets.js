import React, { Component } from 'react'

class Secrets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 'e.g.: 728BXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        };
    }
    handleChange = (e) => {
        this.setState({ token: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // On Submit send a request to server
        // wait for answer from server
        // if answer ok -> continue + close form
        // if Remember me, add to local storage
        // else -> stay here and ask for key again
        console.log('perf')
    }
  render() {
    return (
    <div className="width-90 bg-white margin-top">
        <form className="text-center" onSubmit={this.handleSubmit}>
            <p>Your key:</p>
            <input type="text" placeholder={this.state.token} name="key" onChange={this.handleChange} className="login-input"/>
            <div><input type="checkbox" className="login-checkbox"/>Remember me?</div>
            <button type="submit" className="btn btn-success btn-lg">Submit</button>
        </form>
    </div>
    )
  }
}
export default Secrets