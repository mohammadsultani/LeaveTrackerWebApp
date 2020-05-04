import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import FullAccess from './FullAccess'
import NormalAccess from './NormalAccess'
import Guest from './Guest'

class NavbarPage extends Component {
    
    render() {
        if (this.props.token) {
            return (
                <div>
                    {
                        this.props.closeNavbar ? null : 
                       this.props.accessLevel === "Full Access" ? 
                        < FullAccess /> :   
                        this.props.accessLevel === "Normal Access" ?
                        < NormalAccess />  : null
                    }
                </div> 
            )
        }else {
            return (
                <Guest />
            ) 
        }
        
    }
}

const mapStateToProps = state =>  {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        accessLevel: state.auth.accessLevel,
        token: state.auth.token,
        closeNavbar: state.auth.closeNavbar  // if it is TRUE Navbar will not be rendered.
    } 
}
export default connect(mapStateToProps, null) (NavbarPage)
