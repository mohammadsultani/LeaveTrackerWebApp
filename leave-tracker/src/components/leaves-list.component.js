import React, { Component } from 'react';
import { connect } from 'react-redux'
import  Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table" 
import { fetchLeaveRequest, deleteLeaveRequest,denyLeaveRequest,
          updateLeaveRequest, postLeaveRequest, approveLeaveRequest
        } 
from '../actions/leaveActions'
  
//     // <tr>
    //     <td>{props.leaveRequest.name}</td>
    //     <td>{props.leaveRequest.type_of_leave}</td>
    //     <td>{props.leaveRequest.start.substring(0,10)}</td>
    //     <td>{props.leaveRequest.end.substring(0,10)}</td>
    //     <td> 
    //         <button onClick={() => {props.deleteLeaveRequest(props.leaveRequest._id)}}>Delete</button>
    //     </td> 
    // </tr>

// const NewRequest = props => (
//   <tr>
//       <td>{props.leaveRequest.name}</td>
//       <td>{props.leaveRequest.type_of_leave}</td>
//       <td>{props.leaveRequest.start.substring(0, 10)}</td>
//       <td>{props.leaveRequest.end.substring(0, 10)}</td>
//       <td>
//         <button onClick={() => {props.denyRequeset(props.leaveRequest)}}>Deny</button>
//         <button onClick={() => {props.approveRequest(props.leaveRequest)}}>Approve</button>
//       </td>
//   </tr>
// )

class LeavesList extends Component {
    constructor(props){
        super(props)

        this.state = {
         showModal : false, 
         action_reason: "",
         leaveRequest:"",
         actionType:""
        }
    
    }
    componentDidMount() {
      this.props.fetchLeaveRequest()
    }
  
    deleteLeaveRequest(id) {
        this.props.deleteLeaveRequest(id)
    }
    showApproveModal(leaveRequest) {
      this.setState({
        showModal: true,
        leaveRequest: leaveRequest,
        actionType: "Approved"
      })
    }
    showDenyModal(leaveRequest,) {
      this.setState({
        showModal: true,
        leaveRequest: leaveRequest,
        actionType: "Denied"
      })
    }
    modalInput(e) {
      this.setState({
        action_reason: e.target.value
      })
    }
   
    // approvedLeaves() {
    //     return this.props.leaveRequests.filter(e => e.approved === "approved")
    //     .map(currentleave => {
    //         return <ApprovedRequests 
    //         leaveRequest={currentleave} 
    //         deleteLeaveRequest={this.deleteLeaveRequest} 
    //         key={currentleave._id}/> 
    //     })
    // }
    submitRequest() {
      this.setState({ showModal: false})
      if (this.state.actionType === "Approved"){
          const approveRequest = {
              name: this.state.leaveRequest.name,
              type_of_leave: this.state.leaveRequest.type_of_leave,
              leave_reason: this.state.leaveRequest.leave_reason,
              start: this.state.leaveRequest.start,
              end: this.state.leaveRequest.end,
              approved: "Approved",
              _id: this.state.leaveRequest._id,
              action_reason: this.state.action_reason
      }
      this.props.approveLeaveRequest(approveRequest)
      this.props.approvedRequests.unshift(approveRequest)
      }else { 
        const denyRequest = {
        name: this.state.leaveRequest.name,
        type_of_leave: this.state.leaveRequest.type_of_leave,
        leave_reason: this.state.leaveRequest.leave_reason,
        start: this.state.leaveRequest.start,
        end: this.state.leaveRequest.end,
        approved: "Approved",
        _id: this.state.leaveRequest._id,
        action_reason: this.state.action_reason
      }
      this.props.denyLeaveRequest(denyRequest)
      this.props.deniedRequests.unshift(denyRequest)
      }  
  }
  closeModal() {
    this.setState({
      showModal: false
    })
  }
    render() { 
        return (
          <div className="container" >
            { this.props.loading === true ? "Loading" : null }   
            <h3>Approved Requests</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type of Leave</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                      {  this.props.approvedRequests.map(e => (
                        <tr key={e._id}>
                            <th>{e.name}</th>
                            <td>{e.type_of_leave}</td>
                            <td>{e.start.substring(0,10)}</td>
                            <td>{e.end.substring(0,10)}</td>
                            <td>{e.leave_reason}</td>
                            <td><button onClick={this.deleteLeaveRequest.bind(this,e._id)}>Delete</button></td>
                        </tr>
                      )) 
                      } 
                </tbody>
              </Table>
              <h3>New Requests</h3>
              <Table responsive>
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Type of Leave</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                      {  this.props.newRequests.map(e => (
                        <tr key={e._id}>
                            <td>{e.name}</td>
                            <td>{e.type_of_leave}</td>
                            <td>{e.start.substring(0,10)}</td>
                            <td>{e.end.substring(0,10)}</td>
                            <td>{e.leave_reason}</td>
                            <td>
                              <button onClick={this.showApproveModal.bind(this, e)}>Approve</button>
                              <button onClick={this.showDenyModal.bind(this, e)}>Deny</button>
                              
                            </td>
                        </tr>
                      )) 
                      } 
                </tbody>
              </Table>
              <h3>Denied Requests</h3>
              <Table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Type of Leave</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                      {  this.props.deniedRequests.map(e => (
                        <tr key={e._id}>
                            <th>{e.name}</th>
                            <td>{e.type_of_leave}</td>
                            <td>{e.start.substring(0,10)}</td>
                            <td>{e.end.substring(0,10)}</td>
                            <td>{e.leave_reason}</td>
                            <td>
                              <button>Approve</button>
                            </td>
                        </tr>
                      )) 
                      } 
                </tbody>
              </Table>
              <Modal show={this.state.showModal}>
                <Modal.Header>Write Some Comment</Modal.Header>
                <Modal.Body>
                  <input onChange={this.modalInput.bind(this)} 
                  type='text' value={this.state.action_reason}/> 
                </Modal.Body>
                <Modal.Footer>
                  <button onClick={this.submitRequest.bind(this)}>Submit</button>
                  <button onClick={this.closeModal.bind(this)}>Cancel</button>
                </Modal.Footer>
              </Modal>
          </div>
        )     
      } 
}
const mapStateToProps = (state) => {
    return { 
      approvedRequests : state.requests.approvedRequests,
      newRequests: state.requests.newRequests,
      deniedRequests: state.requests.deniedRequests,
      loading: state.requests.loading
      }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchLeaveRequest: () => dispatch(fetchLeaveRequest()),
    postLeaveRequest: (e) => dispatch(postLeaveRequest(e)),
    deleteLeaveRequest: (e) => dispatch(deleteLeaveRequest(e)),
    updateLeaveRequest: (e) => dispatch(updateLeaveRequest(e)),
    approveLeaveRequest: (e) => dispatch(approveLeaveRequest(e)),
    denyLeaveRequest: (e) => dispatch(denyLeaveRequest(e))
    }
  }
 
export default connect(mapStateToProps,mapDispatchToProps)(LeavesList)
