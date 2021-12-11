import { Card, Col, Row } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import "../../Styles/profilestudent.scss";
import { Avatar, List } from "antd";
import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import db from "../../firebase";
import { collection, query,where,getDocs } from "firebase/firestore"; 
// var collectionfb = collection;
const userTaskRef = collection(db, "studentTaskDetails");
const data = [
  {
    title: "Team Member 1",
  },
  {
    title: "Team Member 2",
  },
  {
    title: "Team Member 3",
  },
  {
    title: "Team Member 4",
  },
];


function RenderTimeline (){
  return (
    <div className="RenderTimeLneInMaster">
      <p className="REnderTimeline_timeline_text">TimeLine</p>
  <Timeline mode="alternate">
  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
  <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
  <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
    beatae vitae dicta sunt explicabo.
  </Timeline.Item>
  <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
  <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
    Technical testing 2015-09-01
  </Timeline.Item>
</Timeline>

</div>
  )
}

function RenderTeamDetails({hookup}) {
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(async()=>{debugger
    
    let filterBatchMembers = [];
    if(sessionStorage.getItem("teammembers")){
      if(sessionStorage.getItem("user")){
        let userbatch = JSON.parse(sessionStorage.getItem("user"));
        filterBatchMembers = JSON.parse(sessionStorage.getItem("teammembers")).filter(o=>{
          return userbatch[0].batch == o.batch
        })
      }
      setTeamMembers(filterBatchMembers)
      // hookup(filterBatchMembers)
    }
  },[])
  return (
    <>
    
    <div className='RenderTeamDetailsMaster'>
      <div className="RenderCountAndFeedBackMaster">
      {RenderTimeline()}
      </div>
    
      <div className='RenderTeamDetailsChild2'>
        <Card
          align={"center"}
          title='Your Team'
          bordered={false}
          style={{ width: 390, "margin-left" : "17px" }}
        >
          <List
            itemLayout='horizontal'
            dataSource={teamMembers}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                  title={<a href='https://ant.design'>{item.username}</a>}
                  description='Your Teammate'
                />
              </List.Item>
            )}
          />
        </Card>
        
      </div>
    </div>
    </>
  );
}

function RenderCard({historyUse, hookup}) {
  // debugger
  const history = useHistory();
  const [selfAssessment, setSelfAssessment]= useState(0);
  const [selfDays,setSelfDays] =useState(0);
  const [countAttendance, setCountAttendance] = useState(0);
  const [userForAccInfo, setUserAccInfo] = useState([]);
  useEffect(()=>{
    if(historyUse && historyUse.length){
      sessionStorage.setItem("user", JSON.stringify(historyUse));
      window.userCurrent = historyUse;
      setUserAccInfo(historyUse)
    }else if(sessionStorage.getItem("user")){
      setUserAccInfo(JSON.parse(sessionStorage.getItem("user")))
    }
  },[])
  useEffect(() => {
    
    const getUserAssessmentData=async()=>{
      let count =0;
      
      let queryPut = await query(userTaskRef,where("email", "==", (JSON.parse(sessionStorage.getItem("user"))? JSON.parse(sessionStorage.getItem("user"))[0].email : "")));
      const querySnapshot = await getDocs(queryPut);
      let collArrayTask = [];
      querySnapshot.forEach((doc) => {
      collArrayTask.push(doc.data())
    });
      let assessmentCalculator = collArrayTask.reduce((acc,curr)=>{
        acc += Number(curr.slider)
        return acc
      },0);
      setSelfDays(collArrayTask.length)
      let calculateAssesmentForAllDatesInPercent = (assessmentCalculator / collArrayTask.length);
      console.log(calculateAssesmentForAllDatesInPercent);
      let needed = calculateAssesmentForAllDatesInPercent;
      let neededTimer = setInterval(() => {
        if (count < needed+1) {
          setSelfAssessment(count);
        } else {
          clearInterval(neededTimer);
        }
        count++;
      }, 20);
     
    }
    getUserAssessmentData();
    
    let count = 0;
    let needed = 89;
    let neededTimer = setInterval(() => {
      if (count < needed+1) {
        setCountAttendance(count);
      } else {
        clearInterval(neededTimer);
      }
      count++;
    }, 20);
  }, [userForAccInfo]);
  return (
    <div className='master_col_group_profile'>
      <div className='colonecard colg'>
        <Avatar size={64} icon={<UserOutlined />} />
        <div>{userForAccInfo.length ? userForAccInfo[0].username :"Account Info"}</div>
      </div>

      <div className='coltwocard colg'>
        <Progress
          type='circle'
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={countAttendance}
        />
        <div>Your Attendance</div>
      </div>

      <div className='coltwocard colg'>
        <Progress
          type='circle'
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={selfAssessment}
        />
        <div>Self Assesments
          <h6>Calculated For : {selfDays} days</h6>
        </div>
      </div>
      
    </div>
  );
}

function ProfileStudent() {
  const history =useHistory();
  const [sendTeamMembers, setTeamMembers]= useState([]);
  // const [hookupTeamUsersState, setHookUpTeamUsersState]= ([]);
  
  return (
    <>
      <RenderCard historyUse ={history.location.state.fromPopup} />
      
      <RenderTeamDetails />
      
    </>
  );
}

export default ProfileStudent;
