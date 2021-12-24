import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '.././Styles/studentsLayout.scss'
import React, { useState,useEffect } from 'react'
import { Redirect, useHistory } from 'react-router';
import ChristmasLoader from '../ChristmasLoader';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo ({PropPage,key}){
  const [collapsed, setcollapsed] =useState(false)
  const [navList, setNavList] =useState([]);
  const [checkIfUserIsAdmin, setCheckIfUserIsAdmin] = useState("");
  const [selectionNo, setSelectionNo] = useState(['1']);
  const history = useHistory();
  const [loading, setLoading] =useState(false);
  useEffect(()=>{
    setTimeout(() => {
      setLoading(true)
    }, 5000);
  })
  useEffect(() => {
    
    setCheckIfUserIsAdmin(JSON.parse(sessionStorage.getItem("user"))[0].email)
  }, [])
  useEffect(() => {
    debugger
    let listOfNavs = ["Profile","Users"]
    setSelectionNo(key)
  }, [])
  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  const sliderHandlerChange=(e)=>{
    debugger
    let keysFromValues = ["profile","day-fill", "profile-fill", "attendance","chart"];
    let value = keysFromValues[parseInt(e.key-1)];
    history.push({
      pathname: `/studentsPage/${value}`,
      hash: "",
      state: {  state: { keyForSelection: e.keyPath }}
    });
    

  }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <div className="logoMain">
            </div>
          
     
          <Menu onClick={(e)=>{sliderHandlerChange(e)}} theme="dark" defaultSelectedKeys={history.location.state.state.keyForSelection} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
            Profile
            </Menu.Item>
           {(checkIfUserIsAdmin == "arvinth@citma" || checkIfUserIsAdmin == "admin@citma")&& <Menu.Item key="2" icon={<UserOutlined />} title="User">Users
            </Menu.Item>} 
              
           {(checkIfUserIsAdmin != "admin@citma") && <Menu.Item key="3" icon={<TeamOutlined />} title="User">
              Progress Fill-Up
            </Menu.Item>}
            
            {(checkIfUserIsAdmin == "arvinth@citma") &&   <Menu.Item key="4" icon={<FileOutlined />}>
              Attendance
            </Menu.Item>}
            {(checkIfUserIsAdmin == "arvinth@citma" || checkIfUserIsAdmin == "admin@citma") &&  <Menu.Item key="5" icon={<PieChartOutlined />}>
              Chart
            </Menu.Item>}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          
          <Header className="site-layout-background" style={{ padding: 0 }}  />
          
          <Content style={{ margin: '0 16px' }}>
            <br></br>
            {loading ? PropPage : <ChristmasLoader/>}
           
          </Content>
          <Footer style={{ textAlign: 'center' }}>© CITMA</Footer>
        </Layout>
      </Layout>
    );
 

  
}

export default SiderDemo;