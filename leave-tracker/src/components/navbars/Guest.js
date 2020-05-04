import React, { Component } from 'react'
import RegisterModal from '../auth/RegisterModal'
import LoginModal from '../auth/LoginModal'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container, Alert, Row, Col } from 'reactstrap'

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
                        <Row>
                            <Col md={3}></Col>
                            <Col md={2}>
                                <NavItem>
                                    <NavLink href="#">
                                        <LoginModal /> 
                                    </NavLink>
                                </NavItem>
                            </Col>
                            <Col md={1}></Col>  {/* THe extra Cols are for alignment and spacing */}
                            <Col md={2}></Col>
                            <Col md={3}></Col>
                            <Col md={1}>
                                <NavItem> 
                                    <NavLink href="">
                                        <RegisterModal /> 
                                    </NavLink>
                                </NavItem>
                            </Col>
                        </Row>
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
