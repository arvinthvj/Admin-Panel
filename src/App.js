// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Home from './pages/Home';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "./state/index";
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
import Attendance from './pages/AdminPages/AttendanceMaker';
import TabSwitchers from './pages/amchartpages/TabSwitchers';
import RegistrationForm from './pages/Register';
import { isMobile } from 'mobile-device-detect';
import MobileProfileStudent from './pages/StudentFrontendRoutes/MobileProfile';
import CollapsibleTable from './pages/MaterialTable/TableData';
function App() {
  window.userCurrent =[];
  const [usersLog, setUsersLog] = useState([]);
  async function query(){
   const querySnapshot = await getDocs(collection(db, "users"));
    let userArray = [];
    querySnapshot.forEach((doc) => {
     userArray.push({id : doc.id, email : doc.data().name, password : doc.data().password, username : doc.data().username , batch :doc.data().batch} ) 
    });
    setUsersLog(userArray);
    sessionStorage.setItem("teammembers", JSON.stringify(userArray))
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
          {isMobile ? <Route path='/studentsPage/profile'>
          <SiderDemo userDetails={usersLog} PropPage={<MobileProfileStudent/>} key={['1']} />
          </Route> : <Route path='/studentsPage/profile'>
          <SiderDemo userDetails={usersLog} PropPage={<ProfileStudent/>} key={['1']} />
          </Route> }
          
          <Route path='/studentsPage/day-fill'>
          <SiderDemo userDetails={usersLog} PropPage={<CollapsibleTable/>} key={['2']} />
          </Route>
          <Route path='/studentsPage/profile-fill'>
          <SiderDemo userDetails={usersLog} PropPage={<Demo/>} key={['3']} />
          </Route>
          <Route path='/studentsPage/attendance'>
          <SiderDemo userDetails={usersLog} PropPage={<Attendance/>} key={['4']} />
          </Route>
          <Route path='/studentsPage/chart'>
          <SiderDemo userDetails={usersLog} PropPage={<TabSwitchers/>} key={['5']} />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
