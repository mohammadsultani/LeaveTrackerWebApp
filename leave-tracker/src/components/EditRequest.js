import React, { Component } from 'react';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { updateLeaveRequest } from '../actions/leaveActions'


class EditRequest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            typeOfLeave:"Annual",
            leaveReason: "",
            numberOfDays:null,
            startDate:new Date(),
            endDate:new Date(),

            
            leavesArray: ["Annual","Medical","Emergency"],
        }
    }
    

    handleChange = ({ target }) => {
        this.setState({
            [target.name] : target.value
        })
    }
    onChangeStart = (date) => {
        this.setState({
            startDate: date
        })
    }
    onChangeEnd = (date) => {
        this.setState({
            endDate:date
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault()

        const leaveRequest = {
            name: this.props.leaveRequest.name,
            type_of_leave: this.state.typeOfLeave,
            number_of_days: this.state.numberOfDays,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            leave_reason: this.state.leaveReason,
            status:this.props.leaveRequest.status,
            _id: this.props.leaveRequest._id
        }
        this.props.updateLeaveRequest(leaveRequest)
        window.location = '/myleaves';
    }
    render() {
        return (
            <Container>
                <h3>Edit Leave Request</h3>
                <Form>
                    <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" placeholder={this.props.leaveRequest.name} disabled />
                    </FormGroup>
                    <FormGroup>
                    <Label>Type of Leave</Label>
                    <Input type="select" name="typeOfLeave" onChange={this.handleChange} value={this.state.typeOfLeave}>
                        {      
                            this.state.leavesArray.map((e,i) => (
                                <option key={i}>{e}</option>
                            ))
                        }
                    </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Leave Reason</Label>
                    <Input type="textarea" name="leaveReason" placeholder={this.props.leaveRequest.leave_reason} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label>Number of Days</Label>
                    <Input type="number" name="numberOfDays" placeholder={this.props.leaveRequest.number_of_days} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label>Start Date</Label>
                        <div>
                            <DatePicker
                            selected={this.state.startDate}
                            onChange={this.onChangeStart}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                    <Label>End Date</Label>
                        <div>
                            <DatePicker
                            selected={this.state.endDate}
                            onChange={this.onChangeEnd}
                            />
                        </div>
                    </FormGroup>
                    <Button type="submit" color="primary" onClick={this.onSubmit}>Submit</Button>
                </Form>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        leaveRequest: state.requests.leaveRequest
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateLeaveRequest: (e) => dispatch(updateLeaveRequest(e))
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditRequest)