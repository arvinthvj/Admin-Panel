import { Card, Col, Row } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import "../../Styles/profilestudent.scss";
import { Avatar, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";

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
function RenderTeamDetails() {
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(()=>{
    let filterBatchMembers = [];
    if(sessionStorage.getItem("teammembers")){
      if(sessionStorage.getItem("user")){
        let userbatch = JSON.parse(sessionStorage.getItem("user"));
        filterBatchMembers = JSON.parse(sessionStorage.getItem("teammembers")).filter(o=>{
          return userbatch[0].batch == o.batch
        })
      }
      setTeamMembers(filterBatchMembers)
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
                  description='Ant Design, a design language for background applications, is refined by Ant UED Team'
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

function RenderCard(userDetails) {
  debugger
  const [countAttendance, setCountAttendance] = useState(0);
  const [userForAccInfo, setUserAccInfo] = useState([]);
  useEffect(() => {
    if(userDetails && userDetails.length){
      sessionStorage.setItem("user", JSON.stringify(userDetails));
      setUserAccInfo(userDetails)
    }else if(sessionStorage.getItem("user")){
      setUserAccInfo(JSON.parse(sessionStorage.getItem("user")))
    }
    let count = 0;
    let needed = 89;
    let neededTimer = setInterval(() => {
      if (count < needed) {
        setCountAttendance(count);
      } else {
        clearInterval(neededTimer);
      }
      count++;
    }, 20);
  }, []);
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
          percent={90}
        />
        <div>Self Assesments</div>
      </div>
      
    </div>
  );
}

function ProfileStudent() {
  const history =useHistory();
  const [sendTeamMembers, setTeamMembers]= useState([]);
  
  
  return (
    <>
      {RenderCard(history.location.state.fromPopup)}
      
      {RenderTeamDetails()}
      
    </>
  );
}

export default ProfileStudent;
