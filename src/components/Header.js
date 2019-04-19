import React from 'react'

function Header(props) {
  return (
    <header className="app-header">
        <div className="width-90">
        <button className="btn text-white header-title" onClick={props.goHome}><h1>Bucket List</h1></button> 
        <h3>Secure Cloud Storage</h3>
        </div>
    </header>
  )
}

export default Header
