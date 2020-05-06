import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchLeaveRequest, deleteLeaveRequest, getLeaveRequest, takenLeaveRequest } from '../actions/leaveActions'
import { Alert,Table , Button, Modal, ModalBody, ModalFooter, ModalHeader,Container,Row,Col, Form,FormGroup,Label,Input } from 'reactstrap';
import { updateUserLeaveDays } from '../actions/userActions'
import { fetchLeaveTypes } from '../actions/leaveTypesAction'

class MyLeave extends Component {
    constructor(props){
        super(props)
        this.state = {
          showModal: false,  // It is the main Modal 
          deleteModal:false, // It is the confirmation delete Modal
          leaveRequest:"",  // It stores the Leave Request when Modal is triggered.
          startDate: null,   // It stores startDate from request once modal is triggered.
          endDate: null,    //  It stores endDate from request once modal is triggered
          colors: ["#34d8eb","green","yellow","red" ]  
        }

    }
    componentDidMount() {
       this.props.fetchLeaveRequest()
       this.props.fetchLeaveTypes()
       
    }
    showRequest = (request,index) => (
      <tr key={index}
      style={request.status === "Taken" ? {backgroundColor:this.state.colors[0]}: 
      request.status === "Approved" ? {backgroundColor:this.state.colors[1]}
      : request.status === "New Request" ? {backgroundColor:this.state.colors[2]}:
      {backgroundColor: this.state.colors[3]}
    }
      > 
        <td>{request.type_of_leave}</td>
        <td>{request.startDate.substring(0,10)}</td>
        <td>{request.endDate.substring(0,10)}</td>
        <td>{request.number_of_days}</td>
        <td><Button color="info" onClick={this.modalFunction.bind(this,request)}>Click Here</Button></td>
      </tr>
    )
    modalFunction = (request) => {  // It will execute when the modal rendered. 
      this.setState({ showModal: true, leaveRequest: request, startDate:request.startDate.substring(0,10), endDate:request.endDate.substring(0,10) })
    }
    closeModal = () => {
      this.setState({ showModal: false,deleteModal: false })
    }
     
    deleteModal = () => {
      this.setState({ showModal: false, deleteModal: true})
    }

    deleteRequest = () => {
      if(this.state.leaveRequest.status === "Approved"){
        const isCounted = this.props.leaveTypes.filter(e => e.type_of_leave === this.state.leaveRequest.type_of_leave).map(e => e.isCounted)
        if(isCounted[0]) { // It checks if the request eas counted in number of leaveDaysTaken then
          const userInfo = {  // The number of Leave Days will be deducted based on the number of deleted request 
            name: this.state.leaveRequest.name,    // This is because the leave request was cancelled and ot taken
            numof_leavedays_taken: (this.props.numOfLeaveDaysTaken - this.state.leaveRequest.number_of_days)
          }         // so in this case the number of leave Days taken should be restored back.
            this.props.updateUserLeaveDays(userInfo)
            this.props.deleteLeaveRequest(this.state.leaveRequest._id)
          }else { // if False then just delete the request without any changes to number of leave days taken.
            this.props.deleteLeaveRequest(this.state.leaveRequest._id)
          }
        }else {  // It deletes request that is not approved like taken or denied.
          this.props.deleteLeaveRequest(this.state.leaveRequest._id)
        }
        this.closeModal()
      }
    
    getRequest = () => {
      this.props.getLeaveRequest(this.state.leaveRequest)
    }
    takenLeaveRequest = () => {
      const takenLeave = {
        _id: this.state.leaveRequest._id,
        name: this.state.leaveRequest.name,
        type_of_leave: this.state.leaveRequest.type_of_leave,
        number_of_days: this.state.leaveRequest.number_of_days,
        startDate: this.state.leaveRequest.startDate,
        endDate: this.state.leaveRequest.endDate,
        leave_reason: this.state.leaveRequest.leave_reason,
        action_reason: this.state.leaveRequest.action_reason,
        status: "Taken"
      }
      this.props.takenLeaveRequest(takenLeave)
      this.closeModal()
    }
    render() {
          return (
            <Container>
            <Form>
                <Row>
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Number of Leave Days Given</Label>
                      <Input placeholder={ this.props.numOfLeaveDaysGiven ? 
                        this.props.numOfLeaveDaysGiven : "Not Given Yet" } disabled />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup>
                      <Label>Number of Leave Days Taken</Label>
                      <Input placeholder={ this.props.numOfLeaveDaysTaken ? 
                        this.props.numOfLeaveDaysTaken : "Not Taken Yet"} disabled />
                    </FormGroup>
                  </Col>
                </Row>
            </Form>
            <Row>
              <Col style={{textAlign:"center",backgroundColor:this.state.colors[0]}}>Taken Leaves</Col>
              <Col style={{textAlign:"center",backgroundColor:this.state.colors[1]}}>Approved Requests</Col>
              <Col style={{textAlign:"center",backgroundColor:this.state.colors[2]}}>New Requests</Col>
              <Col style={{textAlign:"center",backgroundColor:this.state.colors[3]}}>Denied Requests</Col>
            </Row>
            <br />
            <Table>
                <thead className="thead-dark">
                  <tr>
                    <th width="20%">Type of Leave</th>
                    <th width="20%">Start Date</th>
                    <th width="20%">End Date</th>
                    <th width="20%">Number Of Days</th>
                    <th width="20%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.takenLeaves.map((request,index) => (
                      this.showRequest(request,index)  
                    ))  
                  }
                  {
                    this.props.approvedRequests.map((request,index) => (
                      this.showRequest(request,index)   
                    ))
                  }
                  {
                    this.props.newRequests.map((request,index) => (
                      this.showRequest(request,index)   
                    ))
                  }
                  {
                    this.props.deniedRequests.map((request,index) => (
                      this.showRequest(request,index)   
                    ))
                  }
                </tbody>
            </Table>
            {       // If The User Has no Leave Request then it will execute.
              (this.props.approvedRequests.length === 0 && this.props.newRequests.length === 0 && this.props.deniedRequests.length === 0 && this.props.takenLeaves.length === 0) ? 
              <Alert color="success" style={{textAlign:"center"}}> You have no leave request yet</Alert> : null
            }
            { /*                        Leave Request Actions Modal                          */}
            <Modal isOpen={this.state.showModal}>
                <ModalHeader toggle={this.closeModal}>Leave Request Details</ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Start Date</Label>
                        <Input type="text" disabled placeholder={this.state.startDate}/>
                      </FormGroup>
                     
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>End Date</Label>
                        <Input type="text" disabled placeholder={this.state.endDate} /> 
                      </FormGroup>
                    </Col>
                  </Row>
                    <FormGroup>
                        <Label>Leave Reason</Label>
                        <Input type="textarea" disabled placeholder={this.state.leaveRequest.leave_reason} /> 
                    </FormGroup>
                </Form>
                {
                  this.state.leaveRequest.action_reason ? 
                  <FormGroup>
                      <Label>{this.state.leaveRequest.status === "Approved" || "Taken" ? "Approved Reason" : "Denied Reason"}</Label>
                      <Input type="textarea" disabled placeholder={this.state.leaveRequest.action_reason} /> 
                </FormGroup> : null
                }
              </ModalBody>
              <ModalFooter>
                {
                  this.state.leaveRequest.status === "New Request" ? 
                  <Link to={"/edit/"+this.state.leaveRequest._id} onClick={this.getRequest}>
                      <Button color="info" >Edit Request</Button>
                  </Link> : 
                  this.state.leaveRequest.status === "Approved" ? 
                  <Button color="success" onClick={this.takenLeaveRequest}>Taken Already</Button> : null
                }
                <Button color="danger" onClick={this.deleteModal}>Delete Request</Button>
              </ModalFooter>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={this.state.deleteModal}>
              <ModalHeader toggle={this.closeModal}>Deleting Request</ModalHeader>
              <ModalBody>
                <h4>Delete Leave Request</h4>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.deleteRequest}>Delete</Button>
              </ModalFooter>
            </Modal>
          </Container>

          )
      }
    }
  
const mapStateToProps = state => {
  return {
    takenLeaves: state.requests.takenLeaves.filter(e => e.name === state.auth.userName),
    approvedRequests: state.requests.approvedRequests.filter(e => e.name === state.auth.userName ),
    newRequests: state.requests.newRequests.filter(e => e.name === state.auth.userName ),
    deniedRequests: state.requests.deniedRequests.filter(e => e.name === state.auth.userName ),
    numOfLeaveDaysGiven: state.auth.numOfLeaveDaysGiven,
    numOfLeaveDaysTaken: state.auth.numOfLeaveDaysTaken,
    leaveTypes: state.types.leaveTypes
  }
}
const mapDispatchToProps = dispatch => {
  return {
   fetchLeaveRequest: () => dispatch(fetchLeaveRequest()),
   deleteLeaveRequest: (e) => dispatch(deleteLeaveRequest(e)),
   getLeaveRequest: (e) => dispatch(getLeaveRequest(e)),
   takenLeaveRequest: (e) => dispatch(takenLeaveRequest(e)),
   updateUserLeaveDays: (e) => dispatch(updateUserLeaveDays(e)),
   fetchLeaveTypes: () => dispatch(fetchLeaveTypes())
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(MyLeave)