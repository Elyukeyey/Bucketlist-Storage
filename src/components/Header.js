import React from 'react'

function Header(props) {
  return (
    <header className="header">
        <button className="btn text-white" onClick={props.goHome}><h1>Bucket List</h1></button> 
        <h3>Secure Cloud Storage</h3>
    </header>
  )
}

export default Header
