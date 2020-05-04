import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLeaveTypes, postLeaveType, deleteLeaveType ,fetchPositionTypes, postPositionType, deletePositionType} from '../actions/leaveTypesAction'
import { Row, Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

export class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideAddLeave: true,  // It controls the visibility of the Add Leave Div
            hideDeleteLeave: true,  // It controls the visibility of the Delete Leave Div
            hideAddPosition: true,  // It controls the visibility of the Add Position Div
            hideDeletePosition: true,  // It Controls the visibility of Delete Postion DIV
            hideButtons: false,   // It Controls the visibility of Buttons 
            leaveType: null,  // It Used for Adding  New Leave Type in submitLeave function  
            leaveColor: null,  // It Used for Adding  New Leave Type in submitLeave function  
            positionType: null,  // It Used for Adding  New Position Type in submitPosition function  
            positionColor: null,  // It Used for Adding  New Position Type in submitPosition function 
            leaveTypeId: null,  // It Used for deleteLeaveType function  
            positionTypeId: null, // It Used for deletePositionType function 
            isCounted: "Yes", // It Determines whether Leave Type should be added to Number of Leave days taken by user. 
            yesNoArray: ["Yes","No"] // It is used in Add type of leave section
        }
    }
    
    componentDidMount() {
        this.props.fetchLeaveTypes()
        this.props.fetchPositionTypes()
    }
    handleChange = ({ target }) => {
        this.setState({ [ target.name ]: target.value })
    }
    onSubmitPosition = (e) => {
        e.preventDefault() 
        const positionType = {
            position_type: this.state.positionType,
            position_color: this.state.positionColor
        }
        this.setState({ hideAddPosition: true, hideButtons: false, positionColor: null, positionType: null })
        this.props.postPositionType(positionType)
    }
    onSubmitLeaveType = (e) => {
        e.preventDefault()
        const leaveType = {
            type_of_leave: this.state.leaveType,
            type_of_color: this.state.leaveColor
        }
        this.state.isCounted === "No" ? leaveType.isCounted = false : leaveType.isCounted = true
        this.setState({ hideAddLeave: true, hideButtons: false , leaveColor: null, leaveType: null})
        this.props.postLeaveType(leaveType)
    }
    storeId = ({ target }) => { // This function store The ID of specific element for DELETION Operation
        if(this.state.hideDeletePosition){
            this.setState({ leaveTypeId: this.props.leaveTypes.filter(e => e.type_of_leave === target.value).map(e => e._id)})
        }else {
            this.setState({ positionTypeId: this.props.positionTypes.filter(e => e.position_type === target.value ).map(e => e._id )})
        }
    }
    deleteLeaveType = () => {
        this.setState({ hideDeleteLeave: true, hideButtons: false })
        this.props.deleteLeaveType(this.state.leaveTypeId)
    }
    deletePositionType = () => {
        this.setState({ hideDeletePosition: true, hideButtons: false })
        this.props.deletePositionType(this.state.positionTypeId)
    }
    componentDidUpdate(prevProps){// Here We set a default value to IDs for deletion
        const { leaveTypes , positionTypes } = this.props
        if(leaveTypes !== prevProps.leaveTypes) {
            if(this.props.leaveTypes.length > 0) { // It prevent error when LeaveType array is empty. 
            this.setState({ leaveTypeId: this.props.leaveTypes[0]._id })  // the default ID will b the first element ID
            }
        }
        if(positionTypes !== prevProps.positionTypes) {
            if(this.props.positionTypes.length > 0){
                this.setState({ positionTypeId: this.props.positionTypes[0]._id})
            }
        }
    }
    render() {
        return ( 
            <Form>
                <FormGroup>
                                 {/*          Leave Type Display Block              */}
                    <h6 style={{textAlign:"center"}}>Types Of Leaves With Background Color</h6>
                    {
                        this.props.leaveTypes.length > 0 ? 
                        <Row>
                        {
                            this.props.leaveTypes.map((e,i) =>(
                                <Col key={i} style={{textAlign:"center",backgroundColor:e.type_of_color}}>
                                    {e.type_of_leave}
                                </Col>
                            ))
                        }
                        </Row> : <Alert color="info" style={{textAlign:"center"}} >There Are No Leave Types Yet</Alert> 
                    }
                    
                </FormGroup>
                {/*           Leave Types  Buttons Section               */}
                <div hidden={this.state.hideButtons}>
                    <Row>
                        <Col>
                            <FormGroup style={{textAlign:"center"}}>
                                <Button style={{fontSize:"80%"}} color="success" onClick={() => {this.setState({ hideButtons: true, hideAddLeave: false})}}>Add Type of Leave</Button> 
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup style={{textAlign:"center"}}>
                                <Button style={{fontSize:"80%"}} color="danger" onClick={() => {this.setState({ hideButtons: true, hideDeleteLeave: false})}}>Delete Type of Leave</Button> 
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                            {/*    Position Types display block    */}
                <FormGroup>
                    <h6 style={{textAlign:"center"}}>Types Of Positions With Background Color</h6>
                    {
                        this.props.positionTypes.length > 0 ? 
                        <Row>
                        {
                            this.props.positionTypes.map((e,i) => {
                              return (
                                <Col key={i} style={{textAlign:"center",backgroundColor:e.position_color}}>
                                    {e.position_type}
                                </Col>
                                )
                            }
                                
                            ) 
                        }
                        </Row> : <Alert color="info" style={{textAlign:"center"}} >There Are No Positions Types Yet</Alert>  
                    }
                    
                    
                </FormGroup>
                {/*              Add Leave Type Section           */}
                <div hidden={this.state.hideAddLeave}>
                    <FormGroup >
                        <Label>Leave Type</Label>
                        <Input type="text" name="leaveType" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Leave Color</Label>
                        <Input type="color" name="leaveColor" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Should it be counted in number of leave days taken by user</Label>
                        <Input type="select" name="isCounted" onChange={this.handleChange}> 
                            { 
                                this.state.yesNoArray.map((e,i) => (
                                    <option key={i}>{e}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>How it Will Look</Label>
                        <Input disabled style={{backgroundColor:this.state.leaveColor}} placeholder={this.state.leaveType}/>
                    </FormGroup>
                    <FormGroup style={{display:"flex", justifyContent:"space-between"}} >
                        <Button color="primary" onClick={this.onSubmitLeaveType}>Submit</Button>
                        <Button color="danger" onClick={() => { this.setState({ hideAddLeave: true, hideButtons: false})}}>x</Button>
                    </FormGroup>
                </div>
                    {/*       Delete Leave Type Section       */}
                <div hidden={this.state.hideDeleteLeave}>
                    <FormGroup>
                        <Label>Select one to delete</Label>
                        <Input onChange={this.storeId} type="select">
                            { this.props.leaveTypes.map((e,i) => (
                                <option key={i}>{e.type_of_leave}</option>
                            )) 
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup style={{display:"flex", justifyContent:"space-between"}} >
                        <Button color="warning" onClick={this.deleteLeaveType}>Delete</Button>
                        <Button color="danger" onClick={() => { this.setState({ hideDeleteLeave: true, hideButtons: false})}}>x</Button>
                    </FormGroup>
                </div>
                
                {  /*          Type of Positions Buttons sections                    */ }
                
                <div hidden={this.state.hideButtons}>
                    <Row>
                        <Col>
                            <FormGroup style={{textAlign:"center"}}>
                                <Button style={{fontSize:"80%"}} color="success" onClick={() => {this.setState({ hideButtons: true, hideAddPosition: false})}}>Add Type of Position</Button> 
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup style={{textAlign:"center"}}>
                                <Button style={{fontSize:"80%"}} color="danger" onClick={() => {this.setState({ hideButtons: true, hideDeletePosition: false})}}>Delete Type of Position</Button> 
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                {/*           Add Position Type Section           */}
                <div hidden={this.state.hideAddPosition}>
                    <FormGroup >
                        <Label>Position Type</Label>
                        <Input type="text" name="positionType" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Leave Color</Label>
                        <Input type="color" name="positionColor" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>How it Will Look</Label>
                        <Input disabled style={{backgroundColor:this.state.positionColor}} placeholder={this.state.positionType}/>
                    </FormGroup>
                    <FormGroup style={{display:"flex", justifyContent:"space-between"}} >
                        <Button color="primary" onClick={this.onSubmitPosition}>Submit</Button>
                        <Button color="danger" onClick={() => { this.setState({ hideAddPosition: true, hideButtons: false})}}>x</Button>
                    </FormGroup>
                </div>
                {/*         Delete Position Type Section        */}
                <div hidden={this.state.hideDeletePosition}>
                    <FormGroup>
                        <Label>Select one to delete</Label>
                        <Input onChange={this.storeId} type="select">
                            { this.props.positionTypes.map((e,i) => (
                                <option key={i}>{e.position_type}</option>
                            )) 
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup style={{display:"flex", justifyContent:"space-between"}} >
                        <Button color="warning" onClick={this.deletePositionType}>Delete</Button>
                        <Button color="danger" onClick={() => { this.setState({ hideDeletePosition: true, hideButtons: false})}}>x</Button>
                    </FormGroup>
                </div>
                
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        leaveTypes : state.types.leaveTypes,
        positionTypes: state.types.positionTypes
    }
}
    

const mapDispatchToProps = () => dispatch => {
    return {
        fetchLeaveTypes: () => dispatch(fetchLeaveTypes()),
        postLeaveType: (e) => dispatch(postLeaveType(e)),
        deleteLeaveType: (e) => dispatch(deleteLeaveType(e)),
        fetchPositionTypes: () => dispatch(fetchPositionTypes()),
        postPositionType: (e) => dispatch(postPositionType(e)),
        deletePositionType: (e) => dispatch(deletePositionType(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
