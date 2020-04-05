import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


class EditRequest extends Component {

    constructor(props) {
        super(props)

        this.onChangename = this.onChangename.bind(this)
        this.onChangetype_of_leave = this.onChangetype_of_leave.bind(this)
        this.onChangestart = this.onChangestart.bind(this)
        this.onChangeend = this.onChangeend.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: "",
            type_of_leave:"",
            start:new Date(),
            end:new Date(),
            typeofleave: []
        }
    }
    componentDidMount(e) {
        axios.get('http://localhost:5000/leaves/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                  name:response.data.name,
                  type_of_leave:response.data.type_of_leave,
                  start:new Date(response.data.start),
                  end:new Date(response.data.end)
                  
              })
          }) 
          .catch(function (error) {
              console.log(error)
          })

     this.setState({
         typeofleave: ["Annual","Medical","Emergency"]
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
    onSubmit(e) {
        e.preventDefault()

        const leaveRequest = {
            name: this.state.name,
            type_of_leave: this.state.type_of_leave,
            start: this.state.start,
            end: this.state.end
        }
        axios.post('http://localhost:5000/leaves/update/'+this.props.match.params.id,leaveRequest)
            .then(res => console.log(res.data))
        
        window.location = '/';
    }
    
    render() {
        return (
            <div>
                <h3>Edit Leave Request</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangename}
                            />
                    </div>
                    <div className="form-group"> 
                        <label>Type of Leave: </label>
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
                        <label>Start Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.start}
                            onChange={this.onChangestart}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>End Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.end}
                            onChange={this.onChangeend}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default EditRequest