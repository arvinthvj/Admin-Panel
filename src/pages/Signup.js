// Render Prop
import React, {useState, useEffect} from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form,  Checkbox, Avatar } from 'antd';
import { UserOutlined ,LoginOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from "antd";
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import '../Styles/signupform.scss'
import 'antd/dist/antd.css';
import logo  from './Images/logo.png'
// import { Form, Input, Button } from 'antd';
import { Alert } from 'antd';
import {  LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import RegistrationForm from "./Register";
import { useHistory } from "react-router";
const { Header, Content, Footer } = Layout;





const NormalLoginForm = ({isReg, userDetails}) => {
const [inputUserEmail , setUserEmail] = useState("");
const [inputUserPass, setUserPass] = useState("");
const [errorUser,setErrorUser] = useState(false);
const history = useHistory();
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
    setErrorUser(false)
    history.push({
      pathname: "/studentsPage/profile",
      hash: "#react",
      state: { userDetails:filteredIfItHas, fromPopup: filteredIfItHas , state: { keyForSelection: ['1'] }}
    });
    debugger
    window.location.reload();
  }else{
    setErrorUser(true)
  }
  console.log(inputUserEmail)
}
  return (
    <>
      <Avatar src={logo} className="citmaLogo" size={140} /> 
    <div className="regButtonSignup">
    
    </div>
    
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      
        {errorUser? <Alert message="No, the user is not found!" type="error" showIcon />:(<div></div>)}
        <div className="signup_form_input">
        <Input onChange={(e)=>{debugger
          setUserEmail(e.currentTarget.value)}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    
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
      <div className="regButtonSignup">
      <Form.Item>
        <Button onClick={handleLogin} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a  onClick={handleRegisterButton}>register now!</a> */}
      </Form.Item>
    <Button onClick={handleRegisterButton} type="primary" htmlType="submit" className="login-form-button">
    Change Password
  </Button>
    </div>
      
     
    </Form>
    
  </>
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
      
      {/* <img src={logo} /> */}
      </Menu>
    
    </Header>
    <Content style={{ padding: "0 50px" , height: "80vh", width:"100vw" }}>
      
      <div className = "signup_inputs_big_master_holder">
      <div  className="signup_inputs_master_holder">

     {isRegister ? <div><RegistrationForm /></div> : <div><NormalLoginForm userDetails={userDetails} isReg={setIsRegister}/></div> }
      
      
    </div>
    </div>
   
    
     
    </Content>
    
    <Footer style={{ textAlign: "center" }}>
   
    </Footer>
  </Layout>)
};

export default SignUp;
