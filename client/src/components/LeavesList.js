import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader, Container, Row, Col, Table, Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
  fetchLeaveRequest, deleteLeaveRequest, denyLeaveRequest,
  updateLeaveRequest, postLeaveRequest, approveLeaveRequest
}
  from '../actions/leaveActions'
import { updateUserLeaveDays,getUser } from '../actions/userActions'
import { fetchLeaveTypes } from '../actions/leaveTypesAction'


class LeavesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      actionReason: "",
      leaveRequest: "",
      startDate: null,
      endDate: null,
      actionType: "",
      types: []
    }

  }
  componentDidMount() {
    this.props.fetchLeaveTypes()
    this.props.fetchLeaveRequest()
  }
  triggerModal(request) {
    this.setState({
      showModal: true,
      leaveRequest: request,
      startDate: request.startDate.substring(0, 10),
      endDate: request.endDate.substring(0, 10)
    })
    this.props.getUser(request.name) // It fetch number of taken leave days of user. The information will be used in approve request function. 
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }
  denyRequest = () => {
    const denyRequest = {
      name: this.state.leaveRequest.name,
      type_of_leave: this.state.leaveRequest.type_of_leave,
      leave_reason: this.state.leaveRequest.leave_reason,
      number_of_days: this.state.leaveRequest.number_of_days,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      status: "Denied",
      action_reason: this.state.actionReason,
      _id: this.state.leaveRequest._id
    }
    this.setState({ showModal: false })
    this.props.denyLeaveRequest(denyRequest)
  }
  approveRequest = () => {
    const userInfo = {
      name: this.state.leaveRequest.name
    }
    // It checks whether the type of leave should be added to number of leave days taken  
   const isCounted = this.props.leaveTypes.filter(e => e.type_of_leave === this.state.leaveRequest.type_of_leave).map(e => e.isCounted)
   // THe isCounted is a Bolean inside an array
   if(isCounted[0]) { // If true then taken leave days will be increased by new request. 
    (userInfo.numof_leavedays_taken = (this.state.leaveRequest.number_of_days + this.props.takenLeaveDays))
   }else { // If false then taken leave days will remain unchange.
    (userInfo.numof_leavedays_taken = this.props.takenLeaveDays)
   }
    const approveRequest = {
      name: this.state.leaveRequest.name,
      type_of_leave: this.state.leaveRequest.type_of_leave,
      leave_reason: this.state.leaveRequest.leave_reason,
      number_of_days: this.state.leaveRequest.number_of_days,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      status: "Approved",
      action_reason: this.state.actionReason,
      _id: this.state.leaveRequest._id
    }
    this.setState({ showModal: false })
    this.props.approveLeaveRequest(approveRequest)       
    this.props.updateUserLeaveDays(userInfo) // It Update Number of Leave days taken by user after request approved.
  }
  showRequests = (request, index) => {
    const leaveType = request.type_of_leave
    const color = this.props.leaveTypes.filter(e => e.type_of_leave === leaveType).map(e => e.type_of_color)
    return (
      <tr style={{ backgroundColor:color}} key={index}>
        <td width="30%">
          {request.name}
        </td>
        <td width="10%">
          {request.number_of_days}
        </td>
        <td width="30%">
          {request.status}
        </td>
        <td width="30%">
          <button onClick={this.triggerModal.bind(this, request)}>Click Here</button>
        </td>
    </tr>
    )
    
  }
  render() {
    const approve = <div>
      <button onClick={this.closeModal}>Close</button>
    </div>

    const deny = <div>
      <button onClick={this.closeModal}>Close</button>
    </div>
    const newRequest = <div>
      <button onClick={this.denyRequest}>Deny</button>
      <button onClick={this.approveRequest}>Approve</button>
      <button onClick={this.closeModal}>Close</button>
    </div>
    if (this.props.accessLevel === "Normal Access") {
      return(
            <Container>
              <Row>
                {
                  this.props.leaveTypes.map((e,i) => (
                    <Col key={i} style={{backgroundColor:e.type_of_color,textAlign:"center"}}>{e.type_of_leave}</Col>
                  ))
                }
              </Row>
              <br />
              <h5 style={{textAlign:"center"}}>Appproved Leave Requests</h5>
              <br/>
              <Table>
                <thead className="thead-dark">
                  <tr>
                      <th width="30%">Name</th>
                      <th width="25%">Start Date</th>
                      <th width="25%">End Date</th>
                      <th width="20%">Number Of Days</th>   
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.approvedRequests.map(e => {
                      const color = this.props.leaveTypes.filter(x => x.type_of_leave === e.type_of_leave).map(x => x.type_of_color)
              return (  <tr style={{backgroundColor:color}} key={e._id}>
                        <td>{e.name}</td>
                        <td>{e.startDate.substring(0,10)}</td>
                        <td>{e.endDate.substring(0,10)}</td>
                        <td>{e.number_of_days}</td>
                      </tr> )
                    })
                  }
                </tbody>
              </Table>
            </Container>       
      )
    }else {
      return (
        <Container>
          <Row>
            {
              this.props.leaveTypes.map((e,i) => (
                <Col key={i} style={{backgroundColor:e.type_of_color}}>{e.type_of_leave}</Col>
              ))
            }
          </Row>
          <br />
          <Table>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Number of Days</th>
                <th>Request Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.takenLeaves.map((request, index) => (
                  this.showRequests(request, index)
                ))
              }
              {
                this.props.approvedRequests.map((request, index) => {
                 
                  return this.showRequests(request, index)
  
                })
  
              }
              {
                this.props.newRequests.map((request, index) => (
                  this.showRequests(request, index)
                ))
              }
              {
                this.props.deniedRequests.map((request, index) => (
                  this.showRequests(request, index)
                ))
              }
            </tbody>
          </Table>
          <Modal isOpen={this.state.showModal}>
            <ModalHeader toggle={this.closeModal}>Leave Request</ModalHeader>
            <ModalBody>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Name</Label>
                      <Input type="text" disabled placeholder={this.state.leaveRequest.name} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Type of Leave</Label>
                      <Input type="text" disabled placeholder={this.state.leaveRequest.type_of_leave} />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>Leave Reason</Label>
                  <Input type="textarea" disabled placeholder={this.state.leaveRequest.leave_reason} />
                </FormGroup>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Start Date</Label>
                      <Input type="text" disabled placeholder={this.state.startDate} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>End Date</Label>
                      <Input type="text" disabled placeholder={this.state.endDate} />
                    </FormGroup>
                  </Col>
                </Row>
                {
                  this.state.leaveRequest.status === "New Request" ? 
                  <FormGroup>
                    <Label>Action Reason</Label>
                    <Input type="textarea" name="actionReason" value={this.state.actionReason} onChange={this.handleChange} />
                  </FormGroup> : 
                  this.state.leaveRequest.status === "Approved" || "Taken" ? 
                  <FormGroup>
                    <Label>Approved Reason</Label>
                    <Input type="textarea" value={this.state.leaveRequest.action_reason} disabled />
                  </FormGroup> : 
                  <FormGroup>
                    <Label>Denied Reason</Label>
                    <Input type="textarea" value={this.state.leaveRequest.action_reason} disabled />
                  </FormGroup> 
                }
                
              </Form>
            </ModalBody>
            <ModalFooter>
              {
                this.state.leaveRequest.status === "Approved" ?
                  deny :
                  this.state.leaveRequest.status === "New Request" ?
                    newRequest : approve
              }
            </ModalFooter>
          </Modal>
  
        </Container>
      )
    }
    
    
  }
}
const mapStateToProps = state => {
  return {
    leaveRequests: state.requests.leaveRequests,
    takenLeaves: state.requests.takenLeaves,
    approvedRequests: state.requests.approvedRequests,
    newRequests: state.requests.newRequests,
    deniedRequests: state.requests.deniedRequests,
    isAuthenticated: state.auth.isAuthenticated,
    leaveTypes: state.types.leaveTypes,
    accessLevel: state.auth.accessLevel,
    takenLeaveDays: state.users.takenLeaveDays // This is the number of leave days token of user.
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchLeaveRequest: () => dispatch(fetchLeaveRequest()),
    postLeaveRequest: (e) => dispatch(postLeaveRequest(e)),
    deleteLeaveRequest: (e) => dispatch(deleteLeaveRequest(e)),
    updateLeaveRequest: (e) => dispatch(updateLeaveRequest(e)),
    approveLeaveRequest: (e) => dispatch(approveLeaveRequest(e)),
    denyLeaveRequest: (e) => dispatch(denyLeaveRequest(e)),
    fetchLeaveTypes: () => dispatch(fetchLeaveTypes()),
    updateUserLeaveDays: (e) => dispatch(updateUserLeaveDays(e)),
    getUser: (e) => dispatch(getUser(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeavesList)
