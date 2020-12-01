import './App.css';
import { Login } from  './components/LogIn/login';
import Register from './components/register/register';
import Doctor from './components/doctors/doctor';
import Patient from './components/patient/patient'
import Displayjson from './components/display/displayjson';

import {BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";


function App() {
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
  );
}

export default App;