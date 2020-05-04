import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container, NavbarText ,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Row, Col } from 'reactstrap'

class FullAccess extends Component {
    constructor() {
        super() 
        this.state = {
            isOpen: false

        }
    }
    logout = () => {
        this.props.logout()
    }
    toggle = () => {
        const  prevState  = this.state.isOpen
        this.setState({
            isOpen: !prevState
        })
    }    
    render() {
        return (
                <Container fluid>
                        <Navbar color="dark" dark expand="md">
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                            <Row>
                                <Col md={9}>
                                    <Nav className="mr-auto" navbar>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Leaves    
                                            </DropdownToggle>
                                            <DropdownMenu style={{backgroundColor:"black"}}>
                                                <DropdownItem style={{backgroundColor:"black"}}>
                                                    <NavItem>
                                                        <NavLink href="/create">Create</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem style={{backgroundColor:"black"}}>
                                                    <NavItem>
                                                        <NavLink href="/myleaves">My Leaves</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem style={{backgroundColor:"black"}}>
                                                    <NavItem>
                                                        <NavLink href="/leaveslist">All Leaves</NavLink>
                                                    </NavItem>
                                                </DropdownItem >
                                                <DropdownItem divider />
                                                <DropdownItem style={{color:"white",backgroundColor:"black"}}>
                                                    Close
                                                </DropdownItem>
                                            </DropdownMenu> 
                                        </UncontrolledDropdown>
                                        <NavItem>
                                            <NavLink href="/userslist">Users</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/editaccount">Edit Account</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/adminpage">Admin Page</NavLink>
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
                                        <div className="col-md-2" > 
                                        </div>
                                        <div className="col-md-5" >
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
export default connect(mapStateToProps, { logout })(FullAccess)
