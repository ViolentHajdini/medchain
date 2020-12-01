import './App.css';
import Login from  './components/LogIn/login'
import Register from './components/register/register';
import Doctor from './components/doctors/doctor';
import Displayjson from './components/display/displayjson';
function App() {
  return (
    <div className="App">
      <Doctor />
    </div>
  );
}

export default App;