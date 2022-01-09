import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ".././Styles/studentsLayout.scss";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo({ PropPage, key }) {
  const [collapsed, setcollapsed] = useState(false);
  const [navList, setNavList] = useState([]);
  const [checkIfUserIsAdmin, setCheckIfUserIsAdmin] = useState("");
  const [selectionNo, setSelectionNo] = useState(["1"]);
  const history = useHistory();
  useEffect(() => {
    setCheckIfUserIsAdmin(JSON.parse(sessionStorage.getItem("user"))[0].email);
  }, []);
  useEffect(() => {
    debugger;
    let listOfNavs = ["Profile", "Users"];
    setSelectionNo(key);
  }, []);
  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  const sliderHandlerChange = (e) => {
    debugger;
    let keysFromValues = [
      "profile",
      "day-fill",
      "profile-fill",
      "attendance",
      "chart",
      "yourhistory"
    ];
    let value = keysFromValues[parseInt(e.key - 1)];
    debugger;
    history.push({
      pathname: `/studentsPage/${value}`,
      hash: "",
      state: { state: { keyForSelection: e.keyPath } },
    });
  };
  return (
    <Layout className='studentLayout' style={{ minHeight: "100vh" }}>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Menu expandIcon={<PieChartOutlined />}
          onClick={(e) => {
            sliderHandlerChange(e);
          }}
          theme='dark'
          defaultSelectedKeys={
            history.location.state
              ? history.location.state.state.keyForSelection
              : "1"
          }
          mode='horizontal'
        >
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            Profile
          </Menu.Item>
          {(checkIfUserIsAdmin == "arvinth@citma" ||
            checkIfUserIsAdmin == "admin@citma") && (
            <Menu.Item key='2' icon={<UserOutlined />} title='User'>
              Users
            </Menu.Item>
          )}

          {checkIfUserIsAdmin != "admin@citma" && (
            <Menu.Item key='3' icon={<TeamOutlined />} title='User'>
              Progress Fill-Up
            </Menu.Item>
          )}

          {checkIfUserIsAdmin == "arvinth@citma" && (
            <Menu.Item key='4' icon={<FileOutlined />}>
              Attendance
            </Menu.Item>
          )}
          {(checkIfUserIsAdmin == "arvinth@citma" ||
            checkIfUserIsAdmin == "admin@citma") && (
            <Menu.Item key='5' icon={<PieChartOutlined />}>
              Chart
            </Menu.Item>
          )}
          {checkIfUserIsAdmin != "admin@citma" && (
            <Menu.Item key='6' icon={<TeamOutlined />} title='Your History'>
              Your History
            </Menu.Item>
          )}
        </Menu>
        <Content style={{ margin: "0 16px" }}>
          <br></br>
          {PropPage ? PropPage : <div></div>}
        </Content>
        <Footer style={{ textAlign: "center" }}>© CITMA</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
