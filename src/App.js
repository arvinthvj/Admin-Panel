// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "./state/index"

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
