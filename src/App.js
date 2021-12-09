// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
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
import { collection, getDocs } from "firebase/firestore"; 
import db from './firebase/index'
import Sider from './pages/StudentsDashboard';
import SiderDemo from './pages/StudentsDashboard';
import ProfileStudent from './pages/StudentFrontendRoutes/Profile';
import RightBody from './pages/RightBody';
import Demo from './pages/StudentFrontendRoutes/ProgressFillUp';

function App() {
  const [usersLog, setUsersLog] = useState([]);
 async function query(){
   const querySnapshot = await getDocs(collection(db, "users"));
    let userArray = [];
    querySnapshot.forEach((doc) => {
     userArray.push({email : doc.data().name, password : doc.data().password}) 
    });
    setUsersLog(userArray);
  }


  
  useEffect(() => {
   query();
  }, [])

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/dashboard'>
            <Home />
          </Route>
          <Route path='/' exact>
            <SignUp userDetails={usersLog}/>
          </Route>
          <Route path='/studentsPage' exact>
            <SiderDemo/>
          </Route>
          <Route path='/studentsPage/profile'>
          <SiderDemo PropPage={<ProfileStudent/>} key={['1']} />
          </Route>
          <Route path='/studentsPage/day-fill'>
          <SiderDemo PropPage={<RightBody/>} key={['2']} />
          </Route>
          <Route path='/studentsPage/profile-fill'>
          <SiderDemo PropPage={<Demo/>} key={['3']} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
