import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers , deleteUser, updateUser } from '../actions/userActions'
import { fetchPositionTypes,fetchLeaveTypes } from '../actions/leaveTypesAction'
import { fetchLeaveRequest } from '../actions/leaveActions'
import { Table, Container, Modal, ModalFooter, ModalHeader, ModalBody, Button, Form, FormGroup,Label, Input, Row, Col, Alert} from 'reactstrap';

class UsersList extends Component {
    constructor(props){
        super(props)
        this.state = {
            showActionModal: false,
            showDeleteModal: false,
            showUpdateModal: false,
            showLeaveModal: false,
            user:{},        // This stores the information related each user to show in Action Modal.
            accessLevel: "Normal Access", // It store input from user and used in UpdateUser function.
            numOfLeaveDaysGiven: null,   // It store the input from user and used in Update user function
            accessLevels: ["Normal Access","Full Access"],
            takenLeaves: []
        }
    }
    
    componentDidMount(){
        this.props.fetchUsers() // Here we get list of all users in our database.
        this.props.fetchPositionTypes() // Here we get Position Types to use the position_color property.
        this.props.fetchLeaveRequest() // It fetches all the taken leaves by the user from database
        this.props.fetchLeaveTypes() // It fetches the type of leaves from database
    }
    actionModal = (user) => { // This function render the first Modal
        this.setState({ user: user ,showActionModal: true })
    }
    handleChange = ({ target }) => {
        this.setState({ [ target.name ]: target.value })
    }
    closeModals = () => {
        this.setState({ showActionModal: false, showDeleteModal: false, showUpdateModal: false })
    }
    componentDidUpdate(prevProps){  // Here the fetchUser function executes if  
        const { userUpdated } = this.props    // the the user was updated.
        if(userUpdated !== prevProps.userUpdated) {
            this.props.fetchUsers()
        }
    }
    deleteUser = () => { //  THis function call the delete action
        this.closeModals()
        const deleteUser = {
            isDeleted: true,            // It only need to make isDeleted to true. 
            id: this.state.user._id
        }
        this.props.deleteUser(deleteUser)
    }

    userTakenLeave = () => {
        this.setState({ showActionModal: false , showLeaveModal: true, 
        takenLeaves: this.props.takenLeaves.filter(e => e.name === this.state.user.name)
        })
    
    }

    updateUser = () => {
        this.closeModals() 
        const  updateUser = {
                access_level: this.state.accessLevel,
                numof_leavedays_given: this.state.numOfLeaveDaysGiven,
                id: this.state.user._id
            }
        this.props.updateUser(updateUser)
       this.setState({ accessLevel: 'Normal Access',  numOfLeaveDaysGiven: null })
    }
    render() { 
        if (this.props.accessLevel === "Normal Access") {
            return( <Alert color="danger" style={{textAlign:"center",marginTop:"20%"}}
            >You Don't have permission to access this page </Alert> )
        }else {
            return (
                <Container>
                    <h6 style={{textAlign:"center"}}>Position Types with background Colors </h6>
                    <Row>
                        {
                            this.props.positionTypes.map((e,i) => (
                                <Col key={i} style={{backgroundColor:e.position_color, textAlign:"center"}}>
                                    {e.position_type}
                                </Col>
                            ))
                        }
                    </Row>
                    <br />
                    <Table>
                        <thead className="thead-dark">
                            <tr>
                                <th width="20%">Name</th>
                                <th width="40%">email</th>
                                <th width="20%">Position</th>
                                <th width="20%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                this.props.users.map((user,index) => {
                            const color = this.props.positionTypes.filter(e => e.position_type === user.position ).map(e => e.position_color) 
                            return( <tr style={{backgroundColor:color}} key={index}>
                                        <th>{user.name}</th>
                                        <th>{user.email}</th>
                                        <th>{user.position}</th>
                                        <th>
                                            <button onClick={this.actionModal.bind(this,user)}>Click Here</button>
                                        </th>
                                    </tr> )
                                }
                                )
                            }
                        </tbody>
                     </Table>
       {/*                                  Actions Modal                                   */}
                    
                    <Modal  isOpen={this.state.showActionModal} >
                        <ModalHeader toggle={this.closeModals}>Users Actions</ModalHeader>
                        <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>User Name</Label>
                                <Input type="text" placeholder={this.state.user.name} disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label>User Email</Label>
                                <Input type="text" placeholder={this.state.user.email} disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label>Number of leave days allocated</Label>
                                {
                                    this.state.user.numof_leavedays_given ? 
                                    <Input placeholder={this.state.user.numof_leavedays_given} disabled/> 
                                    : <Input placeholder="Not yet given" disabled/>
    
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label>Number of Leave Days Taken</Label>
                                {
                                    this.state.user.numof_leavedays_taken ? 
                                    <Input placeholder={this.state.user.numof_leavedays_taken} disabled />
                                    : <Input placeholder="No Leave taken yet" disabled/>  
                                }
                           
                            </FormGroup>
                            <FormGroup>
                                <Label>User Access Level</Label>
                                <Input placeholder={this.state.user.access_level} disabled/> 
                            </FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.userTakenLeave} >Taken Leaves</Button>
                            <Button color="success" onClick={() => {this.setState({showActionModal:false , showUpdateModal: true})}}>
                                Update User
                            </Button>
                            <Button color="danger" onClick={() => {this.setState({showActionModal: false, showDeleteModal:true})}}>
                                Delete User
                            </Button>
                        </ModalFooter>
                    </Modal>
                    {               /*          Delete Confirmation Modal     */              }
                    
                    <Modal isOpen={this.state.showDeleteModal}>
                           <ModalHeader toggle={this.closeModals}>User Deletion</ModalHeader>
                           <ModalBody>
                               <h6>Delete the user</h6>
                           </ModalBody>
                           <ModalFooter>
                                <Button color="danger" onClick={this.deleteUser}>Delete</Button>
                            </ModalFooter>     
                    </Modal>  
                    {/*                          UPdate User MOdal                             */}
    
                    <Modal isOpen={this.state.showUpdateModal}>
                        <ModalHeader toggle={this.closeModals} >Updating User</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Number of Leave Days Given</Label>
                                    <Input invalid={this.state.numOfLeaveDaysGiven ? false : true } type="number" placeholder="Number" name="numOfLeaveDaysGiven" onChange={this.handleChange} required /> 
                                </FormGroup>
                                <FormGroup>
                                    <Label>User Access Level</Label>
                                    <Input type="select" name="accessLevel" onChange={this.handleChange}>
                                        {
                                            this.state.accessLevels.map((e,i) => (
                                                <option key={i}>{e}</option>
                                            ))
                                        }
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateUser}>Submit</Button>
                        </ModalFooter>
                    </Modal>
    
                    {/*                    Taken Leaves Modal by A User                                       */}
                    <Modal isOpen={this.state.showLeaveModal}>
                        <ModalHeader toggle={() => this.setState({ showLeaveModal: false })}>
                            <h5>Taken Leaves by {this.state.user.name}</h5>
                        </ModalHeader>
                        <ModalBody> 
             
                            <h6 style={{textAlign:"center"}}>Types of Leaves With Background Color</h6>
                                    <Row >
                                        { // It render the types of leaves and it's background color
                                            this.props.leaveTypes.map(e => (
                                            <Col key={e._id} style={{backgroundColor: e.type_of_color, textAlign:"center"}}>
                                                {e.type_of_leave}
                                            </Col>
                                            ))
                                        }
                                    </Row>
                                    <br/>
                                    {
                                         this.state.takenLeaves.length > 0 ?( // It checks if there is any taken leaves
                                            <Table>
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th width="40%">Leave Reason</th>
                                                        <th width="20%">Start Date</th>
                                                        <th width="20%">End Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {  
                                                    
                                                    // It renders the Leaves taken by the user 
                                                        this.state.takenLeaves.map(e => {
                                                            const color = this.props.leaveTypes.filter(i => i.type_of_leave === e.type_of_leave).map(e => e.type_of_color)
                                                    return( <tr style={{backgroundColor: color}}>
                                                                <th>{e.leave_reason}</th>
                                                                <th>{e.startDate.substring(0,10)}</th>
                                                                <th>{e.endDate.substring(0,10)}</th>
                                                            </tr> )
                                                        }) 
                                                    } 
                                                </tbody>
                                            </Table>
                                         ) : <Alert style={{textAlign:"center"}}>There Are No Leaves Taken Yet</Alert>
                                    }
                                    
                        </ModalBody>
                    </Modal>
                
                </Container>
            )    
        }
    }
}
const mapStateToProps = state => {
    return {
        users: state.users.users.filter(e => e.isDeleted === false ),   // List of Users fetch by fetchUser function
        userUpdated : state.users.userUpdated, //  It checks if the user update action is dispatched. 
        positionTypes: state.types.positionTypes,
        takenLeaves: state.requests.takenLeaves,
        leaveTypes: state.types.leaveTypes,
        accessLevel: state.auth.accessLevel
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        deleteUser: (e) => dispatch(deleteUser(e)),
        updateUser: (e) => dispatch(updateUser(e)),
        fetchPositionTypes: () => dispatch(fetchPositionTypes()),
        fetchLeaveRequest: () => dispatch(fetchLeaveRequest()),
        fetchLeaveTypes: () => dispatch(fetchLeaveTypes())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList)