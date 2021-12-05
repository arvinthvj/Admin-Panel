// Render Prop
import React, {useState, useEffect} from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form,  Checkbox } from 'antd';
import { UserOutlined ,LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from "antd";
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import '../Styles/signupform.scss'
import 'antd/dist/antd.css';
// import { Form, Input, Button } from 'antd';
import { Alert } from 'antd';
import {  LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import RegistrationForm from "./Register";
const { Header, Content, Footer } = Layout;





const NormalLoginForm = ({isReg, userDetails}) => {
const [inputUserEmail , setUserEmail] = useState("");
const [inputUserPass, setUserPass] = useState("");
const [errorUser,setErrorUser] = useState(false);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
const handleRegisterButton=()=>{
  isReg(true)
}
const handleLogin=()=>{
  debugger
  let allUsers = userDetails.map(o=>{return o});
  let filteredIfItHas = allUsers.filter(o=>{
    return o.email == inputUserEmail && o.password == inputUserPass
  })
  if(filteredIfItHas.length){
    alert("yes has")
    setErrorUser(false)
  }else{
    setErrorUser(true)
  }
  console.log(inputUserEmail)
}
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {/* <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      > */}
        {errorUser? <Alert message="No, the user is not found!" type="error" showIcon />:(<div></div>)}
        <div className="signup_form_input">
        <Input onChange={(e)=>{debugger
          setUserEmail(e.currentTarget.value)}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      {/* </Form.Item> */}
      {/* <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      > */}
        <Input
        onChange={(e)=>{setUserPass(e.currentTarget.value)}}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        </div>
      {/* </Form.Item> */}
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button onClick={handleLogin} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a  onClick={handleRegisterButton}>register now!</a> */}
      </Form.Item>
    </Form>
  );
};
const SignUp = ({userDetails}) => {
  const [isRegister, setIsRegister] = useState(false);
  debugger
  const [userFromApp, setUserFromApp] =useState(userDetails || []);
  return(

  <Layout className='layout'>
    <Header>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["2"]}>
        {/* {new Array(15).fill(null).map((_, index) => {
          const key = index + 1;
          return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
        })} */}
        CITMA<LoginOutlined className="sign_up_login_icon"/>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" , height: "80vh", width:"100vw" }}>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      <div className = "signup_inputs_big_master_holder">
      <div  className="signup_inputs_master_holder">

     {isRegister ? <div><RegistrationForm /></div> : <div><NormalLoginForm userDetails={userDetails} isReg={setIsRegister}/></div> }
      
        {/* <Space size="large"> */}
      {/* <Input
      width ={600}
      size = "large"
      placeholder="Enter your username"
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
    <Input.Password
      placeholder="input password"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    /> */}
    {/* </Space> */}
    </div>
    </div>
   
    
     
    </Content>
    
    <Footer style={{ textAlign: "center" }}>
   
    </Footer>
  </Layout>)
};

export default SignUp;
