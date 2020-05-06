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
                                <div className="firstDiv">   {/*      The div is used for CSS Styling  */}
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
                                </div>    
                                <div className="row secondDiv">  {/* The div is used for CSS Styling */}
                                    <Nav className="mr-auto col-md-3" navbar>
                                    <NavItem>
                                        <NavLink href="/" onClick={this.logout}>Logout</NavLink>
                                    </NavItem>
                                    </Nav>
                                    <div className="col-md-9">
                                        <NavbarText  style={this.props.userName.length < 6 ? { marginLeft:"20%"}:null }>Welcome {this.props.userName}</NavbarText>
                                    </div>
                                          
                                </div>
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
