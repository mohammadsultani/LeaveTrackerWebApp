import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

const LeaveRequest = props => (
    <tr>
        <td>{props.leaveRequest.name}</td>
        <td>{props.leaveRequest.type_of_leave}</td>
        <td>{props.leaveRequest.start.substring(0,10)}</td>
        <td>{props.leaveRequest.end.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.leaveRequest._id}>edit</Link> | <button onClick={() => { props.deleteLeaveRequest(props.leaveRequest._id)}}>delete</button>
        </td>
    
    </tr>
)


class MyLeave extends Component {
    constructor(props){
        super(props)

        this.deleteLeaveRequest = this.deleteLeaveRequest.bind(this)

        this.state = { leaveRequests : [] }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/leaves/')
            .then(response => {
                this.setState({ leaveRequests: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    deleteLeaveRequest(id) {
        axios.delete('http://localhost:5000/leaves/' + id)
            .then(res => console.log(res.data))
    
        this.setState({
            leaveRequests: this.state.leaveRequests.filter(el => el._id !== id)
        })

    }

    leaveRequestList() {
        return this.state.leaveRequests.filter(leave => leave.name === "Mohammad").map(currentleave => {
            return <LeaveRequest leaveRequest={currentleave} deleteLeaveRequest={this.deleteLeaveRequest} key={currentleave._id}/> 
        })
    }

    render() {
        return (
          <div>
            <h3>Leave Requests</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Type of Leave</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.leaveRequestList() }
              </tbody>
            </table>
          </div>
        )
      }
}
export default MyLeave