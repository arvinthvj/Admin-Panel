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
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo ({PropPage,key}){
  const [collapsed, setcollapsed] =useState(false)
  const [navList, setNavList] =useState([]);
  const [selectionNo, setSelectionNo] = useState(['1']);
  const history = useHistory();
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
    let keysFromValues = ["profile","day-fill", "profile-fill"];
    let value = keysFromValues[parseInt(e.key-1)];
    history.push({
      pathname: `/studentsPage/${value}`,
      hash: "",
      state: {  state: { keyForSelection: e.keyPath }}
    });
    // history.push({
    //   pathname: "studentsPage/profile",
    //   hash: "",
    //   state: { keyForSelection: e.key }
    // });
    
    

  }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <div className="logoMain">
          <Avatar size={64} icon={<UserOutlined/>}/>
            </div>
          
     
          <Menu onClick={(e)=>{sliderHandlerChange(e)}} theme="dark" defaultSelectedKeys={history.location.state.state.keyForSelection} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
            Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />} title="User">
              Users
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />} title="User">
              Progress Fill-Up
            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          
          <Header className="site-layout-background" style={{ padding: 0 }}  />
          
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            {PropPage ? PropPage : <div></div>}
           
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
      </Layout>
    );
 

  
}

export default SiderDemo;