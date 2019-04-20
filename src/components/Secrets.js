import React, { Component } from 'react'

class Secrets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            remember: false,
            response: '',
            access: false
        };
    }
    handleChange = (e) => { // e.target == undefined, had to use currentTarget
        const name = e.currentTarget.name;
        this.setState({ [name]: e.currentTarget.value});
    }
    handleClick = () => {
        this.setState({ remember: !this.state.remember });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted ...');

        if(this.state.token === '') { alert('Please enter your key'); } else {
            fetch('https://challenge.3fs.si/storage/locations',
            {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.token
            }}).then(res=> {
                if(res.ok) {
                    if (this.state.remember) { localStorage.setItem('userKey','Token ' + this.state.token); }
                    this.props.handleLogin(this.state.token);
                } else if(res.status === 401) {
                    res.json().then(data=>this.setState({response: data.message + ' Please enter a valid key!'}));
                } else if (res.status === 500) {
                    res.json().then(data=>this.setState({response: 'Server error: ' + data.message + ' Please try again!'}));
                }
            })
        }
        // On Submit send a request to server
        // wait for answer from server
        // if answer ok -> continue + close form
        // if Remember me, add to local storage
        // else -> stay here and ask for key again
    }
  render() {
    return (
    <div className="width-90 bg-white margin-top">
        <div className="text-center text-lg text-danger font-weight-bold">{this.state.response}</div>
        <form className="text-center" onSubmit={this.handleSubmit}>
            <label>Your key:</label>
            <p className="small">e.g.: 728BXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX</p>
            <input type="text" placeholder={this.state.token} name="token" onChange={this.handleChange} className="login-input"/>
            <label>Remember me?</label>
            <input type="checkbox" className="login-checkbox" name="remember" onChange={this.handleClick}/>
            <button type="submit" className="btn btn-success btn-lg"><i className="fas fa-sign-in-alt"></i> Sign in</button>
        </form>
    </div>
    )
  }
}
export default Secrets