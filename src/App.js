// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "./state/index"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from './pages/Signup';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/dashboard'>
            <Home />
          </Route>
          <Route path='/register'>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
