import React , { Component } from 'react'
import { clearError } from '../../actions/errorActions'
import { login } from '../../actions/authActions'
import { sendEmail } from '../../actions/authActions'
import { Button, Modal, ModalHeader, 
    ModalBody, ModalFooter,
    Form, FormGroup, 
    Label , Input,
    Container, NavLink, Alert
}
from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LoginModal extends Component {
    state = {
        loginModal: false, // It shows the Login Modal.
        resetModal: false, // It shows the password Reseting Modal
        email: '',
        password:'',
        msg: null // it is used to display some message from backend to user. 
        
    }
static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearError: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}
toggle = () => { // It controls the login modal
    this.props.clearError()
    this.setState({
        loginModal:!this.state.loginModal
    })
} 
handleChange = ({ target }) => { // 
    this.setState({
        [ target.name ]: target.value
    })
}
componentDidUpdate(prevProps) {
    const { error, isAuthenticated, msg } = this.props
    if(error !== prevProps.error){
        if(error.id === "LOGIN_FAIL"){ // This is for login function.
            this.setState({ msg: error.msg.msg })
        }else if(error.id === "INVALID_EMAIL") { // This is for sendEmail action. 
            this.setState({ msg:error.msg.msg })
        }else {
            this.setState({ msg: null })
        }
    }else if(msg !== prevProps.msg) {
        this.setState({ msg: this.props.msg})
    }
    if (this.state.loginModal) { // Here we close Login Modal if 
        if(isAuthenticated) { // it is Authenticated  
            this.toggle() 
        }
    }
} 
triggerResetModal = () => { // This function Close Login Modal and open reset Modal
    this.setState({ 
        loginModal: false, resetModal: true, msg: null
    })
}

onSubmit = e => { // Here we get The email and password for login action.
    e.preventDefault()
    if (this.state.email.length < 1 || this.state.password.length < 1){ // Here we check if the user 
        this.setState({ msg: "Please enter all fields"})      // provide email and password.
    }
    const user = {
        email: this.state.email,
        password: this.state.password
    }
    this.props.login(user) // Login function is called with email and password.
    
}
sendEmail = e => { // Here we send email for reseting password.
    e.preventDefault()
    if (this.state.email.length > 0){ // Chechking if the email is provided.
        const email = {
            email: this.state.email
        }
        this.props.sendEmail(email) // Calling the function to send email.
    }else {
        this.setState({msg: "Insert Your Email"})
    }
    
}  
    render() {
        return (
            <Container>
                <NavLink onClick={this.toggle} href="#" >Login</NavLink>
                <Modal isOpen={this.state.loginModal}>
                    <ModalHeader toggle={() => {this.setState({ loginModal: false})}}>
                        Login to Your Account
                    </ModalHeader>
                    <ModalBody>
                    { this.state.msg ? <Alert style={{textAlign:"center"}} color="danger">{this.state.msg}</Alert> : null}
                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle} >Cancel</Button>
                        <Button color="danger" onClick={this.triggerResetModal}>Forgot Password</Button>
                        <Button color="primary" type="submit" onClick={this.onSubmit} >Submit</Button>
                    </ModalFooter>
                </Modal>
                {/*            Reset   Password  Modal                */}
                <Modal isOpen={this.state.resetModal}>
                    <ModalHeader toggle={() => {this.setState({ resetModal: false })}}>
                        Forgot Password
                    </ModalHeader>
                    <ModalBody>
                    { this.state.msg ? <Alert style={{textAlign:"center"}} color="danger">{this.state.msg}</Alert> : null}
                        <Label>Email</Label>
                        <Input type="email" name="email" onChange={this.handleChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.sendEmail}>Submit</Button>
                    </ModalFooter>
                </Modal>
            </Container>
            
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error,
        msg: state.auth.msg
    }
}
const mapDispatchToProps = dispatch => {
    return {
        clearError: () => dispatch(clearError()),
        login: (e) => dispatch(login(e)),
        sendEmail: (e) => dispatch(sendEmail(e))
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(LoginModal) 