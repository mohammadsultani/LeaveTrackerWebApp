import React, { Component } from 'react';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { postLeaveRequest } from '../actions/leaveActions'

class CreateRequest extends Component {

    constructor(props) {
        super(props)

        this.onChangename = this.onChangename.bind(this)
        this.onChangetype_of_leave = this.onChangetype_of_leave.bind(this)
        this.onChangestart = this.onChangestart.bind(this)
        this.onChangeend = this.onChangeend.bind(this)
        this.onChangeleave_reason = this.onChangeleave_reason.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: "",
            type_of_leave:"",
            start:new Date(),
            end:new Date(),
            typeofleave: [],
            leave_reason: ""
        }
    }
    componentDidMount(e) {
     this.setState({
         typeofleave: ["Annual","Medical","Emergency"],
        type_of_leave:"Medical"
     })   
    }

    onChangename(e){
        this.setState({
            name:e.target.value
        })
    }
    onChangestart(date){
        this.setState({
            start: date
        })
    }
    onChangeend(date){
        this.setState({
            end:date
        })
    }
    onChangetype_of_leave(e){
        this.setState({
            type_of_leave:e.target.value
        })
    }
    onChangeleave_reason(e) {
        this.setState({
            leave_reason: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()

        const leaveRequest = {
            name: this.state.name,
            type_of_leave: this.state.type_of_leave,
            start: this.state.start,
            end: this.state.end,
            leave_reason: this.state.leave_reason,
            approved: "NewRequest"
        }
        this.props.postLeaveRequest(leaveRequest)
        window.location = '/';
    }
    
    render() {
        return (
            <div>
                <h3>Create New Leave Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangename}
                            />
                    </div>
                    <div className="form-group"> 
                        <label>Type of Leave </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.type_of_leave}
                            onChange={this.onChangetype_of_leave}>
                            {
                                this.state.typeofleave.map(function(typeofleave) {
                                return <option 
                                    key={typeofleave}
                                    value={typeofleave}>{typeofleave}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Leave Reason </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.leave_reason}
                            onChange={this.onChangeleave_reason}
                            />
                    </div>
                    <div className="form-group">
                        <label>Start Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.start}
                            onChange={this.onChangestart}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>End Date </label>
                        <div>
                            <DatePicker
                            selected={this.state.end}
                            onChange={this.onChangeend}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispacthToProps = dispatch => {
    return {
        postLeaveRequest: (e) => dispatch(postLeaveRequest(e))
    }
} 

export default connect(null,mapDispacthToProps)(CreateRequest)
