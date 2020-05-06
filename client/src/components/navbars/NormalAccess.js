import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import {Row, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container, NavbarText, Col } from 'reactstrap'


class NormalAccess extends Component {
    constructor() {
        super() 
        this.state = {
            isOpen: false

        }
    }
    toggle = () => {
        const  prevState  = this.state.isOpen
        this.setState({
            isOpen: !prevState
        })
    }
    logout = () => {
        this.props.logout()
    }
    render() {
        return (
            <Container>
                    <Navbar color="dark" dark expand="md">
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto firstSection" navbar>
                                <NavItem className="create">
                                    <NavLink href="/create">Create Leave Request</NavLink>
                                </NavItem>
                                <NavItem className="myLeave">
                                    <NavLink href="/myleaves">My Leaves</NavLink>
                                </NavItem>
                                <NavItem className="edit">
                                    <NavLink href="/editaccount">Edit Account</NavLink>
                                </NavItem>
                                
                            </Nav>
                            <div className="row secondSection">
                                <div className="col-md-3">
                                    <Nav className="mr-auto" navbar>
                                        <NavItem>
                                            <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                                <div className="col-md-9">
                                    <NavbarText style={this.props.userName.length < 6 ? { marginLeft:"20%"}:null }>Welcome {this.props.userName}</NavbarText>
                                </div>
                            </div>
s                        </Collapse>
                    </Navbar>
                    
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        userName: state.auth.userName
    }
}
export default connect (mapStateToProps,{ logout })(NormalAccess)