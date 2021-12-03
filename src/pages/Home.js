import React from 'react';
import LeftNav from './LeftNav';
import "../Styles/home.scss"
import TopNav from './TopNav';
function Home(props) {
    return (
        <div className="Home_totalMasterContainer">
            <TopNav/>
        <div className="Home_totalContainer">
            
            <LeftNav/>
        </div>
        </div>
        
    );
}

export default Home;