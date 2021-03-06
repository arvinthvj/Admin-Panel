import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Input,
  Row,
  Col,
  Spin,
} from "antd";
import { isMobile } from 'mobile-device-detect';
import { Steps, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import { DatePicker, Space, Modal } from "antd";
import "../../Styles/profileFillup.scss";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../../firebase/index";
// import moment from 'moment';
const { Step } = Steps;
window.sendObj = {};
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const steps = [
  {
    title: "First",
    content: () => {
      return (
        <>
          <Form.Item
            name='select_tech'
            label='Base Technologies'
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please fill the technologies taught",
              },
            ]}
          >
            <Select placeholder='Please select the technology'>
              <Option value='React'>React</Option>
              <Option value='JavaScript'>JavaScript</Option>
              <Option value='HTML/CSS'>HTML / CSS</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='select_level'
            label='Level'
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select the Level!",
              },
            ]}
          >
            <Select placeholder='Please select the Level'>
              <Option value='Easy'>Easy</Option>
              <Option value='Medium'>Medium</Option>
              <Option value='Advanced'>Advanced</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='TopicsCovered'
            label='Topic Categories'
            rules={[
              {
                required: true,
                message: "Please select the Topics",
                type: "array",
              },
            ]}
          >
            <Select mode='multiple' placeholder='Please select the topics'>
              <Option value='Project'>Project</Option>
              <Option value='Logics'>Logics</Option>
              <Option value='Basics'>Basics</Option>
            </Select>
          </Form.Item>
        </>
      );
    },
  },
  {
    title: "Second",
    content: () => {
      return (
        <>
          <Form.Item
            name='radio-button'
            label='Previous Task Status'
            rules={[
              {
                required: true,
                message: "Please pick an item!",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value='Partially Done!'>
                Partially Done!
              </Radio.Button>
              <Radio.Button value='Done With Some Doubts!'>
                Done With Some Doubts!
              </Radio.Button>
              <Radio.Button value='Done With no clarified Doubts !!'>
                Done With Clarified Doubts
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name='checkbox-group' label='Taught Mode'>
            <Checkbox.Group>
              <Row>
                <Col span={13}>
                  <Checkbox
                    value='Practical'
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Practical
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value='Theoretical'
                    style={{
                      lineHeight: "32px",
                    }}
                  >
                    Theoretical
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label='No. of tasks given'>
            <Form.Item name='input-number' noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className='ant-form-text'> Tasks</span>
          </Form.Item>
        </>
      );
    },
  },
  {
    title: "Last",
    content: () => {
      return (
        <>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please pick a date!",
              },
            ]}
            name='Date-Pick'
            label='Date Pick'
          >
            <DatePicker style={{ width: isMobile ? "fit-content" :"30rem" }} bordered={false} />
          </Form.Item>
          <Form.Item rules={[]} name='Message' label='Any Comments'>
            <TextArea autoSize />
          </Form.Item>
          <Form.Item
            name='slider'
            rules={[
              {
                required: true,
                message: "Please select your scale!",
              },
            ]}
            label='Rate your understanding'
          >
            <Radio.Group>
              <Radio.Button value='60'>
                60
              </Radio.Button>
              <Radio.Button value='80'>
                80
              </Radio.Button>
              <Radio.Button value='100'>
               100
              </Radio.Button>
            </Radio.Group>
          </Form.Item> 
            
          
          
        </>
      );
    },
  },
];
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
function warning() {
  Modal.error({
    centered: true,
    title: 'Submission Restricted For the Selected Date',
    content: (
      <div>
        Arvinth has not filled the attendance of ur batch for this date. Please tell him to fill !
      </div>
    )
    
  });
}
function success() {
  Modal.success({
    centered: true,
    content: "Cool,Your Data is Submitted Successfully !",
  });
}

function onChange(date, dateString) {
  console.log(date, dateString);
}
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const Demo = () => {
  const [loadSpinState, setloadSpinState] = useState(false);


  async function additionalCheckWithTheTraiinerAttendance(obj) {
    debugger;
    let querySnapshotHere = await getDocs(collection(db, "userattendance"));
    let userArrayHere = [];
    querySnapshotHere.forEach((doc) => {
      userArrayHere.push(doc.data());
    });
    let didHeFill = "no";
    userArrayHere.map(o=>{
      if(((o.batchesConductedForTheDay && o.batchesConductedForTheDay.includes(JSON.parse(sessionStorage.getItem("user"))[0].batch)) && (o.dateToCompareFormat==obj["Date-Pick"]))){
        didHeFill = "yes"
      }
    });
    if(didHeFill == "no"){
      warning();
      setloadSpinState(false);
    }else{
      saveDataNowAfterCheck(obj);
    }


  }
  async function saveDataToFb(obj) {
    setloadSpinState(true);
    let querySnapshot = await getDocs(collection(db, "studentTaskDetails"));
    let userArray = [];
    querySnapshot.forEach((doc) => {
      userArray.push(doc.data());
    });
    let filterByUser = userArray.filter((o) => {
      return obj.email == o.email && o["Date-Pick"] == obj["Date-Pick"];
    });

    if (filterByUser.length == 0) {
      additionalCheckWithTheTraiinerAttendance(obj);
    } else {
      setloadSpinState(false);
      alert("You have already ");
    }
  }
  async function saveDataNowAfterCheck(obj) {
    debugger;
    const docRef = await addDoc(collection(db, "studentTaskDetails"), obj);
    console.log("Document written with ID: ", docRef.id);
    if (docRef.id) {
      setloadSpinState(false);
      success();
    } else {
      alert("there is a problem");
    }
  }
  const [current, setCurrent] = useState(0);
  const onFinish = (values) => {
    debugger;
    Object.keys(values).map((o) => {
      if (values[o] == undefined) {
        values[o] = "";
      }
      window.sendObj[o] = values[o];
    });
    Object.keys(JSON.parse(sessionStorage.getItem("user"))[0]).map((o) => {
      window.sendObj[o] = JSON.parse(sessionStorage.getItem("user"))[0][o];
    });
    if (Object.keys(window.sendObj).length == 14) {
      if (current == 2) {
        window.sendObj["Date-Pick"] = values["Date-Pick"]["_d"].toDateString();
        saveDataToFb(window.sendObj);
      } else {
        next();
      }
    } else {
      next();
    }
    console.log("Received values of form: ", values);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <Spin spinning={loadSpinState}>
      <div className='profilefilluptotalcontainer'>
        <div className='profilefillmasterstepholder'>
          <div className='profilefillupstepsholder'>
            {isMobile ? <></> : <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>}
            
          </div>
        </div>

        <div className='ProgressFillMasterOriginal'>
          <div className='ProgressFillMaster'>
            <Form
              name='validate_other'
              {...formItemLayout}
              layout='horizontal'
              onFinish={onFinish}
              initialValues={{
                "input-number": 3,
                "checkbox-group": ["Practical", "Theoretical"],
                rate: 3.5,
              }}
            >
              {steps[current].content()}
              <div className='steps-action'>
                <Form.Item
                  wrapperCol={{
                    span: 12,
                    offset: 6,
                  }}
                >
                  {current < steps.length - 1 && (
                    <Button
                      style={{ "margin-top": "3rem" }}
                      type='primary'
                      htmlType='submit'
                    >
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      style={{ "margin-top": "3rem" }}
                      type='primary'
                      htmlType='submit'
                    >
                      Done
                    </Button>
                  )}
                  {current > 0 && (
                    <Button
                      style={{ "margin-top": "3rem", margin: "0 8px" }}
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Demo;
