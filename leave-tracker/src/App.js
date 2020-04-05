import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from 'react-redux'

import Navbar from "./components/navbar.component"
import LeavesList from "./components/leaves-list.component"
import EditRequest from "./components/edit-request.component"
import CreateRequest from "./components/create-request.component"
import MyLeaves from "./components/myleave.component"
import store from './store'

function App() {
  return (
    <Provider store={store} >
        <Router>
          <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={LeavesList} />
          <Route path="/edit/:id" component={EditRequest}/>
          <Route path="/create" component={CreateRequest}/>
          <Route path="/myleaves" component={MyLeaves}/>
          </div>
        </Router>
    </Provider>
  );
}

export default App;
