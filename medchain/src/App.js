import './App.css';
import React,{ Component } from 'react';
import { Login } from  './components/LogIn/login';
import Doctor from './components/doctors/doctor';
<<<<<<< HEAD
import Patient from './components/patient/patient'
import { Scanner } from './components/qrcode/scanner';
=======
import Patient from './components/patient/patient';
import Test from './components/LogIn/test.js';
>>>>>>> 83be12f96ece90b7c1b690cb6d05ddcbbb9e9f4b

import {BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:"",
      something:{}
    }
    this.handleAlter = this.handleAlter.bind(this);
  }

  handleAlter(data){
    this.setState({id:data});
  }
  render(){
  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route
          exact 
          path={'/'} 
          render={props => (<Login { ...props} handleAlter={this.handleAlter} id={this.state.id} />)}
          />
          <Route 
          exact
          path={'/test'}
          render={props => (<Test { ...props} handleAlter={this.handleAlter} test={this.state.id} />)} 
          />
          <Route 
          exact
          path={'/doctor'}  
          render={props =>(<Doctor { ...props} id={this.state.id} />)}/>
          <Route
          exact 
          path={'/patient/:id'}  
          render={props => (<Patient { ...props} id={this.state.id}/>)}/>
        </Switch>
      </Router>
    </div>
  );}
}

export default App;