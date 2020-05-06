import React, { Component } from 'react'
import RegisterModal from '../auth/RegisterModal'
import LoginModal from '../auth/LoginModal'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container, Alert, Row, Col } from 'reactstrap'
// import '../../index.css'
class Guest extends Component {
    constructor() {
        super() 
        this.state = {
            isOpen: false

        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    render() {
        return (
            <Container>
                    <Navbar color="dark" dark expand="md">
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="loginNav">
                                <NavLink href="">
                                    <LoginModal /> 
                                </NavLink>
                            </NavItem>
                            <NavItem className="registerNav"> 
                                <NavLink href="">
                                    <RegisterModal /> 
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>
                    <br />
                    <br />
                    <br />
                    <Alert color="primary" style={{textAlign:"center"}}>
                        PLease Log in or Register an Account
                    </Alert>
            </Container>
        )
    }
}

export default Guest 
