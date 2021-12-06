import { Layout, Menu, Breadcrumb } from 'antd';
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
          

          <Menu onClick={(e)=>{sliderHandlerChange(e)}} theme="dark" defaultSelectedKeys={history.location.state.state.keyForSelection} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
            Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
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
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            {PropPage ? PropPage : <div></div>}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
 

  
}

export default SiderDemo;