import React, { useEffect } from 'react';
import {Row as Srow, Col as Scol} from 'reactstrap';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../firebase';
import CalandarComponent from './Calandar';

function YourHistory(props) {
useEffect(async() => {
    window.currentUserFilledDaysDetails = [];
    const q = query(collection(db, "studentTaskDetails"), where("email", "==",JSON.parse(sessionStorage.getItem("user"))[0].email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      window.currentUserFilledDaysDetails.push(doc.data());
    });
}, [])


    return (
        <Srow>
            {/* <Scol>Hi</Scol>
            <Scol>Hi</Scol> */}
            <CalandarComponent/>
        </Srow>
    );
}

export default YourHistory;