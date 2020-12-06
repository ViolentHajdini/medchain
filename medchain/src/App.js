import './App.css';
import React,{ Component } from 'react';
import { Login } from  './components/LogIn/login';
import Doctor from './components/doctors/doctor';
import Patient from './components/patient/patient'
import { Scanner } from './components/qrcode/scanner';

import {BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";


class App extends Component {

  render(){
  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route path='/' exact component={Login}/>
          <Route path='/doctor' exact component={Doctor}/>
          <Route path='/patient/:id' exact component={Patient}/>
        </Switch>
      </Router>
    </div>
  );}
}

export default App;