import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import './index.css'
import Navbar from "./components/navbars/Navbar"
import LeavesList from "./components/LeavesList"
import EditRequest from "./components/EditRequest"
import CreateRequest from "./components/CreateRequest"
import MyLeaves from "./components/MyLeave"
import UsersList from './components/UsersList'
import store from './store'
import EditAccount from './components/EditAccount'
import RequiredAuth from './components/Authorization'
import AdminPage from './components/AdminPage'
import ResetPassword from './components/ResetPassword'
import { Container } from 'reactstrap';

class App extends Component {
  
  componentWillMount() {
    if(localStorage.getItem('email')) { // Here we define a condition to avoid callig loadUser in ResetPassword component.
      return null                   // if local storage has email then we dont want to load user info
    }else {                         //  else it should load as usual.
      store.dispatch(loadUser()) 
    }
    
  }
  render() {  
    return (
      <Provider store={store} >
          <Router>
            <Navbar />
            <Container>
              <br/>
              <Route path="/editaccount" component={RequiredAuth(EditAccount)}/>
              <Route path="/resetpass/:token" component={ResetPassword} />
              <Route path="/myleaves" component={RequiredAuth(MyLeaves)}/>
              <Route path="/leaveslist" component={RequiredAuth(LeavesList)} />
              <Route path="/edit/:id" component={RequiredAuth(EditRequest)}/>
              <Route path="/create" component={RequiredAuth(CreateRequest)}/>
              <Route path="/adminpage" component={RequiredAuth(AdminPage)}/>
              <Route path="/userslist" component={RequiredAuth(UsersList)}/>
            </Container>
          </Router>
      </Provider>
    );
  }
 
}

export default App;
