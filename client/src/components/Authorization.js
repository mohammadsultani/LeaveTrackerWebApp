import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'

function RequiredAuth(Input){
    class Authorization extends Component {
        render() {
            const { token ,isAuthenticated} = this.props
            if (token && isAuthenticated){
                return (
                    <Fragment>
                        <Input />
                    </Fragment>
                )
            }else {
                return (
                       null       
                )
            }
            
        }
    }
    const mapStateToProps = state => {
        return {
            token: state.auth.token,
            isAuthenticated: state.auth.isAuthenticated
        } 
    }
    return connect(mapStateToProps)(Authorization)
}
export default RequiredAuth

