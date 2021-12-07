import { Card, Col, Row } from 'antd';
import {useState,useEffect} from 'react'
import '../../Styles/profilestudent.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Progress } from 'antd';


function RenderCard(){
  const [countAttendance ,setCountAttendance] =useState(0);
  useEffect(() => {
    let count = 0;
    let needed = 89;
    let neededTimer =setInterval(() => {
      if(count<needed){
        setCountAttendance(count);
      }else{
        clearInterval(neededTimer)
      }
      count++;
    }, 20);
   
  }, [])
    return (
      <div className='master_col_group_profile'>
        
            <div className="colonecard colg">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>Account Info</div>
            </div>
              
           
              <div className="coltwocard colg">
              <Progress
                type='circle'
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={countAttendance}
                
              />
              <div>
                Your Attendance
              </div>
              </div>
              

              <div className="coltwocard colg">
              <Progress
                type='circle'
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={90}
                
              />
              <div>
                Self Assesments
              </div>
              </div>
             
              
      </div>
    );
}

function ProfileStudent(){
return (
    <>
   { RenderCard()}
   
    </>
)
}

export default ProfileStudent;