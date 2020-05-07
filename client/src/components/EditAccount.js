import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container,Form,FormGroup , Label, Input , Alert, Button, FormText } from 'reactstrap'
import { updateUserAccount } from '../actions/userActions'
import { fetchPositionTypes } from '../actions/leaveTypesAction'
import { clearError } from '../actions/errorActions'
class EditAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            position: "",
            msg: ""
        }
    }
    componentDidMount() {
        this.props.fetchPositionTypes()
    }
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }  
    componentDidUpdate(prevProps) {
        const { error } = this.props
        if (error !== prevProps.error) {
            if (error.id === "Update Account Fail") {
                this.setState({ msg: error.msg.msg })
            }else{
                this.setState({ msg : null })
            }
        }
    } 
    
    emailValidation = (email) => {  // It validate the email given by the user 
        var re = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return re.test(String(email).toLowerCase())
    }

    onSubmit = () => {
        if(this.emailValidation(this.state.email)){ // Here it call the email validation function
            this.setState({ msg: ""})
            const updatedUser = {
            name : this.props.userName,
            email: this.state.email,
            position: this.state.position,
            id: this.props.userId
        }
            this.props.updateUserAccount(updatedUser)
        }else{
            this.setState({msg: "Invalid Email!"})
        }
        
    }
        
    
    render() {
        const style = {textAlign: "center"}
        return (
            <Container>
                <Form>
                    { 
                        this.state.msg ? <Alert style={style} color="danger" >{this.state.msg}</Alert> : null  
                    }
                    <FormGroup>
                    <Label>Name</Label>
                    <Input disabled placeholder={this.props.userName}/>
                    <FormText>Name is not Editable</FormText>
                    </FormGroup>
                    <FormGroup>
                    <Label>Email</Label>
                    <Input type="text" placeholder={this.props.userEmail} name="email" value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                    <Label>Position</Label>
                    <Input type="select" name="position" value={this.state.position}
                    onChange={this.handleChange}>
                            <option>Selete one</option>
                        {
                            this.props.positionTypes.map((e,i) => (
                                <option key={i}>{e.position_type}</option>   
                            ))
                        }
                    </Input>
                    </FormGroup>
                </Form>
                <Button color="primary" onClick={this.onSubmit}>Submit</Button>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userEmail: state.auth.userEmail,
        userPosition: state.auth.userPosition,
        userId: state.auth.userId,
        error: state.error,
        positionTypes: state.types.positionTypes
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUserAccount: (e) => dispatch(updateUserAccount(e)),
        clearError: () => dispatch(clearError()),
        fetchPositionTypes: () => dispatch(fetchPositionTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)
