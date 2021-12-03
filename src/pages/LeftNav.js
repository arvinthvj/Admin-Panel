import React from 'react';
import "../Styles/leftNav.scss";
import {useState, useEffect} from 'react';
import navData from './Data/LeftSideNavData';
function LeftNav(props) {
    const [SideNavNames, setSideNavNames] = useState(navData);
const handleSideNavClick=(e)=>{
    let navNames =  SideNavNames.map(e=>{return e});
    navNames.forEach(o=>{
        if(e.name == o.name){
            o.selected = true
        }else{
            o.selected= false
        }
    })
    
    setSideNavNames(navNames)
}
    return (
        <div className="LeftNav_totalContainer">
            <div className="LeftNav_subTotalContainer">
            {SideNavNames.map((e,i)=>(
                <>
                <div onClick={()=>{handleSideNavClick(e)}} key={i} className={`LeftNav_names ${i} ${e.selected ? "selected": "notSelected"}`}>{e.name}</div>
                </>
            ))}
            </div>
        </div>
    );
}

export default LeftNav;