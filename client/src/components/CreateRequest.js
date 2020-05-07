import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { postLeaveRequest } from '../actions/leaveActions'
import { fetchLeaveTypes } from '../actions/leaveTypesAction'
class CreateRequest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            typeOfLeave:null,
            leaveReason: null,
            numberOfDays: null,
            startDate:new Date(),
            endDate:new Date(),
            numOfLeaveDaysAllowed: null // This is the difffence between the number of leave days allowed and taken from database. 
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
    this.props.fetchLeaveTypes() 
    this.setState({ numOfLeaveDaysAllowed:(this.props.numOfLeaveDaysGiven - this.props.numOfLeaveDaysTaken)}) 

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
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

    componentDidUpdate(prevProps) { // This function display backend feedback to user
       const { error, msg ,} = this.props
       if(error !== prevProps.error) {
            if(error.msg.msg === "Token is not valid!"){
                alert("Please Login Again!")
             }else{
                alert("Leave Request Failed!")
             } 
        }else if(msg !== prevProps.msg) {
            alert("Leave Request Added!")
         }
    }
    submitRequest = (e) => {
        e.preventDefault() 
        this.setState({ failedsMsg: null, successMsg: null}) // Reseting state to display msg for next request.
        if(this.state.numberOfDays > this.state.numOfLeaveDaysAllowed){
            alert('You have not enough Leave Allowance')
        }else{
            const leaveRequest = {
                name: this.props.name,
                type_of_leave: this.state.typeOfLeave,
                number_of_days: this.state.numberOfDays,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                leave_reason: this.state.leaveReason,
                status: "New Request"
            }
            this.props.postLeaveRequest(leaveRequest)
        }
        
    }
    
    render() { 
        if((this.props.numOfLeaveDaysGiven - this.props.numOfLeaveDaysTaken) > 0 ) {
            return ( 
            <div>
            <Form>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" placeholder={this.props.name} disabled />
                </FormGroup>
                <FormGroup>
                    <Label>Type of Leave</Label>
                   <Input type="select" name="typeOfLeave" onChange={this.handleChange} >
                            <option>Select Here</option>
                        {      
                            this.props.leaveTypes.map((e,i) => (
                                <option key={i}>{e.type_of_leave}</option>
                            ))
                        }
                    </Input>           
                </FormGroup>
                <FormGroup>
                    <Label>Leave Reason</Label>
                    <Input type="textarea" name="leaveReason" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Number of days on Leave</Label>
                    <Input type="number" name="numberOfDays" placeholder="Number" onChange={this.handleChange} />
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
                <Button type="submit" color="primary" onClick={this.submitRequest}>Submit</Button>
                
            </Form>
            <br/>
            </div>
                )
        
        }else{
            return (<Alert color="danger" style={{textAlign:"center", marginTop:"20%"}}>You do not have any leave Allowance</Alert>) 
        }  
    }
}
const mapStateToProps = state => {
    return {
        name: state.auth.userName,
        leaveTypes: state.types.leaveTypes,
        numOfLeaveDaysGiven: state.auth.numOfLeaveDaysGiven,
        numOfLeaveDaysTaken: state.auth.numOfLeaveDaysTaken,
        msg: state.requests.msg,
        error: state.error
    }
}
const mapDispacthToProps = dispatch => {
    return {
        postLeaveRequest: (e) => dispatch(postLeaveRequest(e)),
        fetchLeaveTypes: () => dispatch(fetchLeaveTypes())
    }
} 

export default connect(mapStateToProps,mapDispacthToProps)(CreateRequest)
