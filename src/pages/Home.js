import React from 'react';
import LeftNav from './LeftNav';
import "../Styles/home.scss"
import TopNav from './TopNav';
import RightBody from './RightBody';
function Home(props) {
    return (
        <div className="Home_totalMasterContainer">
            <TopNav/>
        <div className="Home_totalContainer">
            
            <LeftNav/>
            <div className="Home_Right_body_container">
                <div className="Home_Right_Subbody_container">
                <RightBody/>
                </div>
            
            </div>
           
        </div>
        </div>
        
    );
}

export default Home;