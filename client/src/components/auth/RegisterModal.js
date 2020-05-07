import React , { Component } from 'react'
import { register } from '../../actions/authActions'
import { clearError } from '../../actions/errorActions'
import { Button, Modal, ModalHeader, 
    ModalBody, ModalFooter,
    Form, FormGroup, 
    Label , Input,
    Container, NavLink, Alert
}
from 'reactstrap'
import { fetchPositionTypes } from '../../actions/leaveTypesAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class RegisterModal extends Component {
    state = {
        showModal: false,
        name:'',
        email: '',
        password1:'',
        password2: "",
        msg: "",
        position: ""
    }
static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    leaveTypes: PropTypes.object.isRequired,
    fetchPositionTypes: PropTypes.func.isRequired
}
componentDidMount() {
    this.props.fetchPositionTypes()
}
triggerModal = () => {
    this.props.clearError()
    this.setState({
        showModal:!this.state.showModal
    })
} 
handleChange = ({ target }) => { 
    this.setState({
        [ target.name]: target.value
    })
}  

componentDidUpdate(prevProps) {
    const { error, isAuthenticated , positionTypes } = this.props
    if(error !== prevProps.error){
        if(error.id === "REGISTER_FAIL"){
            this.setState({ msg: error.msg.msg })
        }else {
            this.setState({ msg: null})
        }
    }
    // It assign the position to first position type value from database 
    if(positionTypes !== prevProps.positionTypes) {
      this.setState({position: this.props.positionTypes[0].position_type })
    }
    // It manage the modal if isAuthenticated change
    if (this.state.showModal) {
        if(isAuthenticated) {
            this.triggerModal()
        }
    }
}
emailValidation = (email) => {  // It validate the email given by the user 
    var re = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return re.test(String(email).toLowerCase())
}

onSubmit = e => {
    e.preventDefault()
    if(this.emailValidation(this.state.email)){ // Here it call the email validation function
        if (this.state.password1 === this.state.password2){
            if(this.state.password1.length > 5){
                const newUser = {
                    name: this.state.name,
                    email: this.state.email.toLowerCase(),
                    password: this.state.password1,
                    position: this.state.position,
                    access_level: "Normal Access",
                    numof_leavedays_given: null,
                    numof_leavedays_taken: null,
                    isDeleted: "false"
                }
                this.props.register(newUser)
            }
        }
    }else {
        this.setState({ msg: "Invalid Email!"})
    }
    
    
}  
    render() {
        const wrongPassword = "Password is not matching"
        const passwordLength = "Password should be at least 6 charachters"
        const style = {textAlign: "center"}
        return (
            <Container>
                <NavLink onClick={this.triggerModal} href="#">Register</NavLink>
                <Modal isOpen={this.state.showModal}>
                    <ModalHeader>Register Form</ModalHeader>
                    <ModalBody>
                    { 
                    this.state.password1 !== this.state.password2 ? 
                    <Alert style={style} color="danger" >{wrongPassword}</Alert> :
                    this.state.msg ?  
                    <Alert style={style} color="danger" >{this.state.msg}</Alert> :
                    this.state.password1.length < 6 && this.state.password1.length > 0 ? 
                    <Alert style={style} color="danger" >{passwordLength}</Alert> :
                    null
                    }
                    <Form>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" placeholder="Password" name="password1" value={this.state.password1} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm Password</Label>
                            <Input type="password" placeholder="Password" name="password2" value={this.state.password2} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Position</Label>
                            <Input type="select" name="position" value={this.state.position}
                            onChange={this.handleChange}>
                                {
                                    this.props.positionTypes.map((e, index) => (
                                        <option key={index}>{e.position_type}</option>   
                                    ))
                                }
                            </Input>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.triggerModal} >Cancel</Button>
                        <Button color="primary" type="submit" onClick={this.onSubmit} >Submit</Button>
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
        positionTypes: state.types.positionTypes
    }
}
const mapDispatchToProps = dispatch => {
    return {
        register: (e) => dispatch(register(e)),
        clearError: () => dispatch(clearError()),
        fetchPositionTypes: () => dispatch(fetchPositionTypes()) 
    }
}
export default connect (mapStateToProps, mapDispatchToProps)(RegisterModal) 