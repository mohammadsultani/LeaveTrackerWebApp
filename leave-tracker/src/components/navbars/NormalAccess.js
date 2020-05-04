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
                        <Row>
                            <Col md={9}>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/create">Create Leave Request</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/myleaves">My Leaves</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/editaccount">Edit Account</NavLink>
                                    </NavItem>
                                    
                                </Nav>
                            </Col>
                            <Col md={3}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Nav className="mr-auto" navbar>
                                            <NavItem>
                                                <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <NavbarText style={{fontSize:"70%"}}>Welcome {this.props.userName}</NavbarText>
                                    </div>
                                </div>
                                
                            </Col>
                        </Row>
                        </Collapse>
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