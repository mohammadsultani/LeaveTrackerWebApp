import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                    <Link to="/" className="navbar-brand">Leaves Tracker</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Leave Request</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/edit/:id" className="nav-item nav-link">Edit Requets</Link>
                            </li>
                            <li className="navbar-item">
                            <Link to="/myleaves" className="nav-item nav-link">My Leaves</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar
