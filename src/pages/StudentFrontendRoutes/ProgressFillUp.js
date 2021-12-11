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
  } from 'antd';
  import { Steps,message } from 'antd';
  import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import { DatePicker, Space ,Modal } from 'antd';
  import "../../Styles/profileFillup.scss";
  import { collection, addDoc } from "firebase/firestore"; 
  import db from '../../firebase/index';
// import moment from 'moment';
  const { Step } = Steps;
  window.sendObj ={};
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const steps = [
    {
      title: 'First',
      content: ()=>{
        return (
        <>
        <Form.Item
          name="select_tech"
          label="Base Technologies"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please fill the technologies taught',
            },
          ]}
        >
           
          <Select placeholder="Please select the technology">
            <Option value="React">React</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="HTML/CSS">HTML / CSS</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="select_level"
          label="Level"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select the Level!',
            },
          ]}
        >
          <Select placeholder="Please select the Level">
          <Option value="Easy">Easy</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Advanced">Advanced</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="TopicsCovered"
          label="Topic Categories"
          rules={[
            {
              required: true,
              message: 'Please select the Topics',
              type: 'array',
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select the topics">
            <Option value="Project">Project</Option>
            <Option value="Logics">Logics</Option>
            <Option value="Basics">Basics</Option>
          </Select>
        </Form.Item>
        </>)
      }
    },
    {
      title: 'Second',
      content: ()=>{
        return (
          <>
          <Form.Item
          name="radio-button"
          label="Previous Task Status"
          rules={[
            {
              required: true,
              message: 'Please pick an item!',
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="Partially Done!">Partially Done!</Radio.Button>
            <Radio.Button value="Done With Some Doubts!">Done With Some Doubts!</Radio.Button>
            <Radio.Button value="Done With no clarified Doubts !!">Done With Clarified Doubts</Radio.Button>
          </Radio.Group>
        </Form.Item>
  
        <Form.Item name="checkbox-group" label="Taught Mode">
          <Checkbox.Group>
            <Row>
              <Col span={13}>
                <Checkbox
                  value="Practical"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                 Practical
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="Theoretical"
                  style={{
                    lineHeight: '32px',
                  }}
                 
                >
                 Theoretical
                </Checkbox>
              </Col>
              
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="No. of tasks given">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={10} />
          </Form.Item>
          <span className="ant-form-text"> Tasks</span>
        </Form.Item>
          </>
        )
      },
    },
    {
      title: 'Last',
      content: ()=>{
        return (
          <>
<Form.Item rules={[
            {
              required: true,
              message: 'Please pick a date!',
            },
          ]} name="Date-Pick" label="Date Pick">
          
        <DatePicker style={{width:"30rem"}} bordered={false} />
        </Form.Item>
        <Form.Item rules={[
            
          ]} name="Message" label="Any Comments">
          
          <TextArea  autoSize/>
        </Form.Item>
        <Form.Item name="slider" rules={[
            {
              required: true,
              message: 'Please select your scale!',
            },
          ]} label="Rate your understanding">
          <Slider
          
            marks={{
              0: 'Bad',
              20 :"Only Some",
              40: 'With Doubts',
              60: "Good",
              80: 'Better',
              100: 'Best',
            }}
          />
        </Form.Item>
  
        
       
        
        
        {/* <Form.Item name="rate" label="Rate">
          <Rate />
        </Form.Item> */}
  
        
  
  {/* <Form.Item
          label="Comments"
        >
          <TextArea rows={4} />
          </Form.Item>
          
   */}
       
          </>
        )
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
  function success() {
    Modal.success({
      centered:true,
      content: 'Cool,Your Data is Submitted Successfully !',
    });
    
  }
  
  
  function onChange(date, dateString) {
   
    console.log(date, dateString);
  }
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  
  
// Add a new document in collection "cities"
async function saveDataToFb(obj){
  debugger
  const docRef = await addDoc(collection(db, "studentTaskDetails"), obj);
  console.log("Document written with ID: ", docRef.id);
}



  const Demo = () => {
    
    const [current, setCurrent] = useState(0);
    const onFinish = (values) => {
      debugger
      Object.keys(values).map(o=>{
        if(values[o]==undefined){
          values[o]="";
        }
        window.sendObj[o] = values[o];
      })
      Object.keys(JSON.parse(sessionStorage.getItem("user"))[0]).map(o=>{
        window.sendObj[o] = JSON.parse(sessionStorage.getItem("user"))[0][o]
      })
      if(Object.keys(window.sendObj).length == 13){
        if(current == 2){
          window.sendObj["Date-Pick"]= values["Date-Pick"]._d 
          saveDataToFb(window.sendObj);
          success();
        }else{
          next();
        }
      }else{
        next();
      }
      
      // values["Date-Pick"]= values["Date-Pick"]._d 
      // saveDataToFb(values);
     
      console.log('Received values of form: ', values);
    };
    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
    return (
      <div className="profilefilluptotalcontainer">
        <div className="profilefillmasterstepholder">
        <div className="profilefillupstepsholder">
        <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
        </div>
        </div>
        
  
        <div className="ProgressFillMasterOriginal">
           
        <div className="ProgressFillMaster">
        
      <Form
        name="validate_other"
        {...formItemLayout}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['Practical', 'Theoretical'],
          rate: 3.5,
        }}
      >
        
        
        {steps[current].content()}
        <div className="steps-action">
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          
       {current < steps.length - 1 && (
          <Button style={{"margin-top":"3rem"}} type="primary" htmlType="submit" >
            Next
          </Button>
        )}
         {current === steps.length - 1 && (
          <Button style={{"margin-top":"3rem"}} type="primary" htmlType="submit">
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ "margin-top":"3rem",margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        </Form.Item>
        </div>
      </Form>
      </div>
      
      </div>
      </div>
    );
  };
  

  export default Demo