import React, { useEffect, useState } from "react";
import { Calendar, Badge, Avatar } from "antd";
import { collection, getDocs, query, where } from "@firebase/firestore";
import db from "../../firebase";
import { isMobile } from "mobile-device-detect";
import { Modal, Button, Space } from "antd";
import { Row as Srow, Col as Scol } from "reactstrap";
import { Rate } from "antd";
import { Tooltip, Progress } from "antd";
import "./calandar.css";
import { Tag, Divider } from 'antd'
function CalandarComponent(props) {
  const [modalStatus, setModalStatus] = useState(false);
  const [studentsFilledArray, setStudentsFilledArray] = useState([]);
  const [
    attendanceForThatBatchCompareArray,
    setAttendanceForThatBatchCompareArray,
  ] = useState([]);

  useEffect(() => {
    if (
      window.currentUserFilledDaysDetails &&
      window.currentUserFilledDaysDetails.length
    ) {
      setStudentsFilledArray(window.currentUserFilledDaysDetails);
    }
  }, [window.currentUserFilledDaysDetails]);

  useEffect(async () => {
    let attendanceBatchArray = [];
    const q = query(
      collection(db, "userattendance"),
      where(
        "batchesConductedForTheDay",
        "array-contains",
        JSON.parse(sessionStorage.getItem("user"))[0].batch
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      attendanceBatchArray.push(doc.data());
    });
    setAttendanceForThatBatchCompareArray(attendanceBatchArray);
  }, []);
  function info(element) {
    debugger;
    Modal.info({
      centered: true,
      title: `${element["radio-button"]} as on ${element["Date-Pick"]}`,
      content: (
        <Srow>
          <Scol className='modalCol'>
            <Srow>
              <Scol>
                <Avatar
                  size={80}
                  src={
                    require(`../Images/${
                      JSON.parse(sessionStorage.user)[0].email
                    }.jpeg`).default
                  }
                />
              </Scol>
              <Scol>
                <Srow>
                  <Scol >
                    <Srow >{JSON.parse(sessionStorage.user)[0].username}</Srow>
                    <Srow className="greyText">
                      Batch {JSON.parse(sessionStorage.user)[0].batch}
                    </Srow>
                    <Srow> 
                      <Progress className="progressCalandar" percent={element.slider} steps={5} />{" "}
                    </Srow>
                  </Scol>
                  {/* <Scol>
                     

                      
                      </Scol> */}
                </Srow>
              </Scol>
            </Srow>
          </Scol>
          {/* <Scol>hi2</Scol> */}
        </Srow>
      ),
      onOk() {},
    });
  }

  function getListData(value) {
    // debugger;
    let listData = [];
    studentsFilledArray.map((e) => {
      if (e["Date-Pick"] == value._d.toDateString()) {
        listData.push({
          type: "warning",
          color:"green",
          content: isMobile ? "F" : "This is Filled",
        });
      }
    });
    attendanceForThatBatchCompareArray.map((e) => {
      if (e.dateToCompareFormat == value._d.toDateString()) {
        listData.push({
          type: "success",
          color:'#2db7f5',
          content: isMobile ? "C" : "Class happened",
        });
      }
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div style={{overflow:"hidden"}}>
        {listData.map((item) => (
          <p key={item.content}>
              <Tag color={item.color}>
              {item.content}
              </Tag>
            {/* <Badge status= text= /> */}
          </p>
        ))}
      </div>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  const selectHandler = (e) => {
    studentsFilledArray.map((element) => {
      if (element["Date-Pick"] == e._d.toDateString()) {
        info(element);
      }
    });
  };
  return (
    <div className='calandarcomponentMain'>
      {studentsFilledArray.length &&
      attendanceForThatBatchCompareArray.length ? (
        <>
        {`${JSON.parse(sessionStorage.getItem("user"))[0].username}'s History`}
          <Calendar
            onSelect={(e) => {
              selectHandler(e);
            }}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CalandarComponent;
