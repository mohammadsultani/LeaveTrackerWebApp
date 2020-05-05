import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeNavbar, resetPassword } from '../actions/authActions'
import { Form, Button , FormGroup, Label, Input, Alert } from 'reactstrap'
class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",          // Passwords store new password from user.
            confirmingPass: "",
            token:null,     // token will be send with api call for verification.
            email: null     // email will be send with api.
        }
    }
    componentWillMount() {
        this.props.closeNavbar() // It close Navbar.
    }
    handleChange = ({ target }) => { //  it takes input from user. 
        this.setState({
            [ target.name ] : target.value   
        })
    }
    componentDidUpdate(prevProps){ // Here we show messages from backend to user.
        const { error , isAuthenticated } = this.props // The focus is on this two props.
        if(error !== prevProps.error){
            if(error.id === "RESETING_PASSWORD_FAILED"){
                alert('Reseting Password Failed!')
            }
        }else if(isAuthenticated !== prevProps.isAuthenticated) { // Here if password reseted succesfully. 
            window.location = '/'        // User will be redirected to homepage. 
        }
    }
    onSubmit = () => {  // This function call the api action
        if (this.state.password === this.state.confirmingPass) {
            if (this.state.password.length > 5) {
                const userInfo = {
                    email: localStorage.getItem('email'),  
                    password: this.state.password
                }
                this.props.resetPassword(userInfo) // Calling the action
                localStorage.removeItem('email')    // It help loadUser function to work properly.
            }else {
                alert('passsword Should be at least 6 charachters!')
            }
        }else {
            alert('passsword Not Matching!')
        }
        
    }
    render() {
        return (
            <Form>
                <FormGroup>
                    <Alert style={{textAlign:"center"}}>Reset Your Password with at least charachter</Alert>
                </FormGroup>
                <FormGroup>
                    <Label >New Password</Label>
                    <Input type="password" name="password" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input type="password" name="confirmingPass" onChange={this.handleChange} /> 
                </FormGroup>
                <FormGroup>
                    <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                </FormGroup>
            </Form>
        )
    }
}
const mapStateToProps = state => {
    return {  // The state are used in componentDidUpdate function
        isAuthenticated: state.auth.isAuthenticated, 
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        closeNavbar: () => dispatch(closeNavbar()),
        resetPassword: (e) => dispatch(resetPassword(e))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword)